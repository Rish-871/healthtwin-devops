from __future__ import annotations

import os
from typing import Any

from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd

try:
    import tensorflow as tf
except Exception:  # pragma: no cover - fallback for lightweight local setups
    tf = None

app = Flask(__name__)
CORS(app)

DATASET_PATH = os.environ.get("DATASET_PATH", "health_dataset_1000_total.csv")
PREPROCESSOR_PATH = os.environ.get("PREPROCESSOR_PATH", "health_preprocessor.pkl")
MODEL_PATH = os.environ.get("MODEL_PATH", "health_model.h5")


def load_feature_template() -> pd.Index:
    dataframe = pd.read_csv(DATASET_PATH)
    dataframe = dataframe.drop(
        columns=[
            "Gender",
            "Gen_Risk_Diabetes",
            "Gen_Risk_Heart",
            "BP",
            "Medication",
            "Unnamed: 21",
            "Employment_Sector",
            "Job_Type",
            "Work_Hours_per_W",
        ],
        errors="ignore",
    )
    return dataframe.drop(columns=["HbA1c_3mo (target)"], errors="ignore").columns


def try_load_artifacts() -> tuple[Any | None, Any | None]:
    preprocessor = None
    model = None

    try:
        if os.path.exists(PREPROCESSOR_PATH):
            preprocessor = joblib.load(PREPROCESSOR_PATH)
        if tf is not None and os.path.exists(MODEL_PATH):
            model = tf.keras.models.load_model(MODEL_PATH, compile=False)
            model.compile(optimizer="adam", loss="mse", metrics=["mae"])
    except Exception:
        preprocessor = None
        model = None

    return preprocessor, model


FEATURE_COLUMNS = load_feature_template()
PREPROCESSOR, MODEL = try_load_artifacts()


def calculate_hba1c(glucose_level: float) -> float:
    return round((glucose_level + 46.7) / 28.7, 2)


def classify_risk(hba1c: float) -> str:
    if hba1c >= 6.5:
        return "diabetes"
    if hba1c >= 5.7:
        return "prediabetes"
    return "normal"


def build_sample_frame(payload: dict[str, Any], hba1c_estimate: float) -> pd.DataFrame:
    sample_data = pd.DataFrame(
        {
            "Patient_ID": [int(payload.get("age", 0) or 0)],
            "Age": [int(payload.get("age", 0) or 0)],
            "Height_cm": [float(payload.get("height", 170) or 170)],
            "Weight_kg": [float(payload.get("weight", 70) or 70)],
            "Work_Hours_per_Week": [int(payload.get("workHours", 40) or 40)],
            "Work_Stress_Level": [payload.get("workStress", "Low") or "Low"],
            "Healthcare_Access": [payload.get("healthcareAccess", "Good") or "Good"],
            "Health_Insurance": [payload.get("healthInsurance", "Yes") or "Yes"],
            "Steps_per_day": [int(payload.get("stepsPerDay", 8000) or 8000)],
            "Sleep_hours": [float(payload.get("sleepHours", 7.0) or 7.0)],
            "Diet_score": [int(payload.get("dietScore", 6) or 6)],
            "Heart_rate": [int(payload.get("heartRate", 70) or 70)],
            "Glucose_level": [float(payload["glucoseLevel"])],
            "Blood_pressure_sys": [int(payload.get("bpSystolic", 120) or 120)],
            "Blood_pressure_dia": [int(payload.get("bpDiastolic", 80) or 80)],
            "Cholesterol": [int(payload.get("cholesterol", 200) or 200)],
            "BMI": [float(payload.get("bmi", 25.0) or 25.0)],
            "Exercise_days": [int(payload.get("exerciseDays", 3) or 3)],
            "HbA1c (%)": [hba1c_estimate],
        }
    )
    return sample_data.reindex(columns=FEATURE_COLUMNS, fill_value=0)


def validate_payload(payload: Any) -> tuple[dict[str, Any] | None, str | None]:
    if not isinstance(payload, dict):
        return None, "Request body must be a JSON object."

    if payload.get("glucoseLevel") in (None, ""):
        return None, "glucoseLevel is required."

    try:
        float(payload["glucoseLevel"])
    except (TypeError, ValueError):
        return None, "glucoseLevel must be numeric."

    return payload, None


@app.get("/healthz")
def healthz():
    return jsonify(
        {
            "status": "ok",
            "model_loaded": bool(MODEL),
            "preprocessor_loaded": bool(PREPROCESSOR),
        }
    )


@app.post("/predict")
@app.post("/api/predict")
def predict():
    payload, error = validate_payload(request.get_json(silent=True))
    if error:
        return jsonify({"status": "error", "error": error}), 400

    glucose_level = float(payload["glucoseLevel"])
    hba1c_estimate = calculate_hba1c(glucose_level)
    risk_category = classify_risk(hba1c_estimate)

    # Keep the feature frame construction in place so the API stays aligned
    # with the training schema even though the current output is rule-based.
    build_sample_frame(payload, hba1c_estimate)

    return jsonify(
        {
            "status": "success",
            "hba1c": hba1c_estimate,
            "prediction": hba1c_estimate,
            "risk_category": risk_category,
            "glucose_level": glucose_level,
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
