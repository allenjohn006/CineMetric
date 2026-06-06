# CineMetric - Enterprise Content Intelligence Dashboard

![CineMetric Dashboard](https://img.shields.io/badge/CineMetric-Intelligence-blue?style=for-the-badge)

CineMetric is a full-stack analytics dashboard designed for OTT platforms, film studios, and content analysts. It turns historical IMDB data into actionable acquisition signals and predicts the Expected Rating and ROI of future content before it is greenlit.

## Features

- **Executive Overview**: KPI cards featuring total movies, average ratings, top performing genres, and historic quality trends.
- **Genre Intelligence (BCG Matrix)**: A 4-quadrant scatter plot (Stars, Cash Cows, Niche Gems, Dogs) mapping production volume against average ratings to identify highly profitable genres.
- **Audience Engagement**: Interactive votes vs. rating correlation with breakdowns on certificate/MPAA effects on audience sizes.
- **Director & Star Power**: Highlighting consistent top-performing directors and tracking star power metrics.
- **Time Intelligence**: Historic trend charts comparing decade-by-decade movie releases and their quality scores.
- **Content ROI Simulator (ML Model)**: Real-time prediction tool where users input target features (Genre, Runtime, Certificate) and our Scikit-Learn RandomForestRegressor predicts the expected rating and issues a Green/Yellow/Red investment signal.

---

## Tech Stack

- **Frontend**: React.js, Vite, TailwindCSS (v4), Recharts
- **Backend**: FastAPI (Python), Uvicorn, Pandas
- **Machine Learning**: Scikit-Learn, Joblib, Numpy
- **Data Processing**: FastParquet, PyArrow

---

## Folder Structure

```text
CineMetric/
├── backend/            # FastAPI python application
│   └── main.py         # Primary API endpoints
├── Data/               # Raw IMDB datasets and processed Parquet files
├── doc/                # Comprehensive project documentation
├── frontend/           # Vite React frontend application
├── models/             # Serialized joblib ML models (Regressor & Classifier)
├── scripts/            # Optional helper scripts
├── preprocess_data.py  # End-to-end data processing and model training script
└── README.md           # This file
```

---

## Setup & Installation

### 1. Backend & ML Pipeline Setup

Ensure you have Python 3.9+ installed. Open a terminal in the root `CineMetric` folder.

**Step 1: Create a virtual environment**
```bash
python -m venv venv
```

**Step 2: Activate the virtual environment**
- **Windows:** `.\venv\Scripts\activate`
- **Mac/Linux:** `source venv/bin/activate`

**Step 3: Install Backend Dependencies**
```bash
pip install fastapi uvicorn pandas scikit-learn pyarrow fastparquet joblib pydantic
```

**Step 4: Run Data Preprocessing (Optional if already trained)**
*Note: Make sure your raw IMDB CSVs (`title.basics.csv`, `title.ratings.csv`, `imdb_top_1000.csv`) are placed in the `Data` directory.*
```bash
python preprocess_data.py
```
This script will merge the datasets, train the Certificate Imputer and Rating Predictor models, and generate the necessary `.parquet` and `.joblib` files.

### 2. Frontend Setup

Open a **new** terminal in the `CineMetric/frontend` folder.

**Step 1: Install Node Dependencies**
Ensure you have Node.js 18+ installed.
```bash
npm install
```
*(Dependencies include React, TailwindCSS, Recharts, React Router, Axios, and Lucide Icons)*

---

## Running the Application

To run the application, you need to run the backend and frontend simultaneously in two separate terminals.

### Terminal 1: Start the FastAPI Backend
Ensure your virtual environment is activated in the root `CineMetric` folder.
```bash
uvicorn backend.main:app --reload
```
*The API will start on `http://127.0.0.1:8000`*

### Terminal 2: Start the React Frontend
Navigate to the `CineMetric/frontend` folder.
```bash
npm run dev
```
*The frontend will start on `http://localhost:5173`*

Open your browser and navigate to `http://localhost:5173` to explore the CineMetric dashboard.

---

## Documentation

Detailed documentation regarding the system architecture, API endpoints, and machine learning pipeline can be found in the `/doc` folder.
