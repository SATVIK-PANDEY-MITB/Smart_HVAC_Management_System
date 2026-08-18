import pandas as pd

from backend.model_loader import get_fault_model

fault_model = get_fault_model()


def predict_fault(sensor_data: dict):

    input_df = pd.DataFrame([sensor_data])

    prediction = fault_model.predict(input_df)[0]

    probability = fault_model.predict_proba(input_df).max()

    if prediction == 0:
        return {
            "status": "Healthy",
            "fault_detected": False,
            "confidence": round(float(probability) * 100, 2),
            "severity": "None",
            "maintenance_required": False
        }

    return {
        "status": "Fault",
        "fault_detected": True,
        "confidence": round(float(probability) * 100, 2),
        "severity": "High",
        "maintenance_required": True
    }