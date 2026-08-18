import pandas as pd

from backend.model_loader import get_energy_model

energy_model = get_energy_model()


def predict_energy(building_data: dict):

    input_df = pd.DataFrame([building_data])

    prediction = energy_model.predict(input_df)[0]

    return {
        "predicted_energy": round(float(prediction), 2)
    }