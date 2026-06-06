# Machine Learning Pipeline

The CineMetric machine learning pipeline is designed to solve two distinct problems: data completion (imputation) and predictive analytics (ROI simulation).

## 1. Certificate Imputation Model (Classification)

**Problem:** The raw 368k IMDB dataset does not contain MPAA "Certificates" (e.g., G, PG-13, R), which are critical for predicting the target audience and ROI of a film.
**Solution:** We leveraged a separate `imdb_top_1000.csv` dataset which *does* contain certificates.

- **Algorithm:** Scikit-Learn `RandomForestClassifier`
- **Features Used:** `Runtime`, `Released_Year`, `IMDB_Rating`, `No_of_Votes`, `Primary_Genre` (encoded).
- **Process:** We trained the classifier on the top 1000 dataset, then ran the inference across the remaining 368,000 rows in the main dataset to synthesize the missing certificate column.
- **Evaluation:** Evaluated using Weighted F1-Score and Recall metrics.

## 2. Content ROI Simulator (Regression)

**Problem:** OTT platforms need to know the expected rating and risk factor of a film script before greenlighting production.
**Solution:** A regression model trained on historic performance to predict future outcomes.

- **Algorithm:** Scikit-Learn `RandomForestRegressor`
- **Features Used:** `runtimeMinutes`, `startYear`, `isAdult`, `Genre_Encoded`, `Cert_Encoded`.
- **Target:** `averageRating`
- **Process:** The model was trained on the fully cleaned and imputed dataset. 
- **Evaluation:** Evaluated using RMSE (Root Mean Squared Error) and R² Score.

## 3. Investment Signal Derivation

While the regression model outputs a continuous float (e.g., `7.2` rating), executives require immediate actionable signals. The backend maps the raw prediction into three distinct categories:
- **Green (High ROI)**: Rating >= 7.5
- **Yellow (Proceed with Caution)**: Rating 6.0 - 7.4
- **Red (High Risk)**: Rating < 6.0

This business logic is strictly enforced in the FastAPI prediction endpoint.
