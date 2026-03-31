import os
import pickle
import pandas as pd
from typing import Literal

MODELS_DIR = "models"

ModelName = Literal["linear_regression", "decision_tree", "random_forest"]


def _load(filename: str):
    path = os.path.join(MODELS_DIR, filename)
    if not os.path.exists(path):
        raise FileNotFoundError(
            f"'{filename}' not found. Run `python -m ml.train` first."
        )
    with open(path, "rb") as f:
        return pickle.load(f)


def predict_price(user_input: dict, model_name: ModelName = "random_forest") -> dict:
    allowed = {"linear_regression", "decision_tree", "random_forest"}
    if model_name not in allowed:
        raise ValueError(f"model_name must be one of {allowed}")

    feature_columns: list = _load("feature_columns.pkl")
    model = _load(f"{model_name}.pkl")

    means = _load("means.pkl")

    # Reproduce the same preprocessing as training
    input_df = pd.DataFrame([user_input])

    for col, value in means.items():
        if col not in input_df.columns:
            input_df[col] = value   # add missing column
        else:
            input_df[col] = input_df[col].fillna(value)

    input_df = pd.get_dummies(input_df)
    input_df = input_df.reindex(columns=feature_columns, fill_value=0)

    predicted = model.predict(input_df)[0]

    return {
        "model": model_name,
        "predicted_price": round(float(predicted), 2),
    }


def predict_all_models(user_input: dict) -> dict:
    results = {}
    for name in ("linear_regression", "decision_tree", "random_forest"):
        results[name] = predict_price(user_input, model_name=name)["predicted_price"]
    return results

