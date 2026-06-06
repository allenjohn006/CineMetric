import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, f1_score, recall_score, accuracy_score
import joblib
import os
import re

print("Loading raw IMDB data...")
data_dir = r"c:\Users\allen\Downloads\CineMetric\Data\imdb_datasets"

basics = pd.read_csv(os.path.join(data_dir, "title.basics.csv"), low_memory=False)
ratings = pd.read_csv(os.path.join(data_dir, "title.ratings.csv"), low_memory=False)

print(f"Basics shape: {basics.shape}, Ratings shape: {ratings.shape}")

# Merge basics and ratings
df = pd.merge(basics, ratings, on="tconst", how="inner")

# Filter for movies to match OTT use-case (if needed, or keep all)
df = df[df['titleType'].isin(['movie', 'tvMovie'])]

# Handle missing values
df = df.replace('\\N', np.nan)
df = df.dropna(subset=['genres', 'runtimeMinutes', 'averageRating', 'numVotes', 'startYear'])

# Convert types
df['runtimeMinutes'] = pd.to_numeric(df['runtimeMinutes'], errors='coerce')
df['startYear'] = pd.to_numeric(df['startYear'], errors='coerce')
df['averageRating'] = pd.to_numeric(df['averageRating'], errors='coerce')
df['numVotes'] = pd.to_numeric(df['numVotes'], errors='coerce')
df['isAdult'] = pd.to_numeric(df['isAdult'], errors='coerce').fillna(0)

df = df.dropna(subset=['runtimeMinutes', 'startYear'])

# Filter by votes to get high-quality data and reduce size (target ~368K)
df = df[df['numVotes'] >= 50]
print(f"Merged & Cleaned Data Shape: {df.shape}")

print("Loading Top 1000 data for Certificate Imputation...")
top1000 = pd.read_csv(r"c:\Users\allen\Downloads\CineMetric\Data\imdb_top_1000.csv")

# Clean top 1000
top1000['Runtime'] = top1000['Runtime'].str.replace(' min', '').astype(float)
top1000['Released_Year'] = pd.to_numeric(top1000['Released_Year'], errors='coerce')
top1000 = top1000.dropna(subset=['Certificate', 'Runtime', 'Genre', 'IMDB_Rating', 'No_of_Votes', 'Released_Year'])

# Simplify certificates
def simplify_cert(c):
    c = str(c).upper()
    if c in ['U', 'G', 'TV-G', 'PASSED', 'APPROVED']: return 'G'
    if c in ['UA', 'PG', 'TV-PG', 'PG-13']: return 'PG-13'
    if c in ['A', 'R', 'TV-MA', 'NC-17']: return 'R'
    return 'PG-13' # Default middle ground

top1000['Cert_Standard'] = top1000['Certificate'].apply(simplify_cert)

print("Training Certificate Imputer Model...")
# Prepare features for Top 1000
# We need consistent genres. We will use the primary genre (first one)
top1000['Primary_Genre'] = top1000['Genre'].apply(lambda x: [g.strip() for g in x.split(',')][0] if pd.notnull(x) else 'Unknown')
df['Primary_Genre'] = df['genres'].apply(lambda x: [g.strip() for g in x.split(',')][0] if pd.notnull(x) else 'Unknown')

# Combine unique genres from both
all_genres = set(top1000['Primary_Genre'].unique()).union(set(df['Primary_Genre'].unique()))
genre_mapping = {g: i for i, g in enumerate(all_genres)}

top1000['Genre_Encoded'] = top1000['Primary_Genre'].map(genre_mapping)
df['Genre_Encoded'] = df['Primary_Genre'].map(genre_mapping)

X_cert = top1000[['Runtime', 'Released_Year', 'IMDB_Rating', 'No_of_Votes', 'Genre_Encoded']]
y_cert = top1000['Cert_Standard']

# Train/test split for evaluation
X_c_train, X_c_test, y_c_train, y_c_test = train_test_split(X_cert, y_cert, test_size=0.2, random_state=42)

cert_clf = RandomForestClassifier(n_estimators=100, random_state=42)
cert_clf.fit(X_c_train, y_c_train)

y_c_pred = cert_clf.predict(X_c_test)
print(f"Certificate Imputer - Accuracy: {accuracy_score(y_c_test, y_c_pred):.3f}")
print(f"Certificate Imputer - F1 Score (weighted): {f1_score(y_c_test, y_c_pred, average='weighted'):.3f}")
print(f"Certificate Imputer - Recall (weighted): {recall_score(y_c_test, y_c_pred, average='weighted'):.3f}")

# Train on full top 1000
cert_clf.fit(X_cert, y_cert)

print("Imputing missing certificates in main dataset...")
X_main_cert = df[['runtimeMinutes', 'startYear', 'averageRating', 'numVotes', 'Genre_Encoded']]
X_main_cert.columns = ['Runtime', 'Released_Year', 'IMDB_Rating', 'No_of_Votes', 'Genre_Encoded']

df['Certificate'] = cert_clf.predict(X_main_cert)
print("Certificate distribution:")
print(df['Certificate'].value_counts())

print("Training ROI / Rating Prediction Model...")
# Features: Runtime, Year, Certificate, Genre_Encoded, isAdult
cert_mapping = {c: i for i, c in enumerate(df['Certificate'].unique())}
df['Cert_Encoded'] = df['Certificate'].map(cert_mapping)

X_roi = df[['runtimeMinutes', 'startYear', 'isAdult', 'Genre_Encoded', 'Cert_Encoded']]
y_roi = df['averageRating']

X_r_train, X_r_test, y_r_train, y_r_test = train_test_split(X_roi, y_roi, test_size=0.2, random_state=42)

roi_reg = RandomForestRegressor(n_estimators=100, max_depth=15, random_state=42, n_jobs=-1)
roi_reg.fit(X_r_train, y_r_train)

y_r_pred = roi_reg.predict(X_r_test)
print(f"Rating Predictor - RMSE: {np.sqrt(mean_squared_error(y_r_test, y_r_pred)):.3f}")
print(f"Rating Predictor - R2 Score: {r2_score(y_r_test, y_r_pred):.3f}")

# Signal Prediction Evaluation
def get_signal(rating):
    if rating >= 7.5: return 'Green'
    if rating >= 6.0: return 'Yellow'
    return 'Red'

y_r_test_signal = y_r_test.apply(get_signal)
y_r_pred_signal = pd.Series(y_r_pred).apply(get_signal)

print(f"ROI Signal - Accuracy: {accuracy_score(y_r_test_signal, y_r_pred_signal):.3f}")
print(f"ROI Signal - F1 Score (weighted): {f1_score(y_r_test_signal, y_r_pred_signal, average='weighted'):.3f}")
print(f"ROI Signal - Recall (weighted): {recall_score(y_r_test_signal, y_r_pred_signal, average='weighted'):.3f}")

# Save the models and mappings
os.makedirs(r"c:\Users\allen\Downloads\CineMetric\models", exist_ok=True)
joblib.dump(cert_clf, r"c:\Users\allen\Downloads\CineMetric\models\certificate_imputer.joblib")
joblib.dump(roi_reg, r"c:\Users\allen\Downloads\CineMetric\models\rating_predictor.joblib")
joblib.dump({'genre_mapping': genre_mapping, 'cert_mapping': cert_mapping}, r"c:\Users\allen\Downloads\CineMetric\models\mappings.joblib")

# Export Processed Data
print("Exporting processed data...")
export_cols = ['tconst', 'primaryTitle', 'startYear', 'runtimeMinutes', 'genres', 'averageRating', 'numVotes', 'Certificate', 'Primary_Genre']
df_export = df[export_cols]
df_export.to_parquet(r"c:\Users\allen\Downloads\CineMetric\Data\processed_imdb_data.parquet", index=False)

print("Done! Data and models are ready.")
