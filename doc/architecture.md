# Architecture Overview

CineMetric is built on a modern, decoupled architecture splitting a lightweight React frontend and a robust data-centric FastAPI backend.

## System Flow

1. **Data Preprocessing Layer**:
   - `preprocess_data.py` acts as the ETL (Extract, Transform, Load) and ML training entrypoint.
   - It ingests massive raw IMDB CSVs, cleans the data, uses a Random Forest Classifier to impute missing certificates, and trains the Random Forest Regressor for ROI predictions.
   - Processed data is exported as an ultra-fast `processed_imdb_data.parquet` file. Models are serialized as `.joblib`.

2. **Backend (FastAPI)**:
   - On startup, the `main.py` application loads the `parquet` file entirely into a Pandas DataFrame in RAM, providing lightning-fast analytics querying capabilities.
   - It also loads the `.joblib` ML models to keep them warm for real-time inference.
   - It exposes multiple RESTful JSON endpoints. Instead of querying a traditional SQL database dynamically, the backend executes instantaneous Pandas groupby/aggregation operations on the cached DataFrame.

3. **Frontend (React)**:
   - Built with Vite for rapid compilation.
   - Relies heavily on **Recharts** for visualizing complex data arrays provided by the API (like the BCG Matrix and historic trends).
   - Component state is managed by React Hooks (`useState`, `useEffect`), pulling data asynchronously from the FastAPI endpoints via `axios`.
   - The UI styling utilizes native Tailwind CSS v4 variables with a custom glassmorphism configuration to provide a premium, application-like feel.
