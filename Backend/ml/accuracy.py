import os
import pickle

MODELS_DIR =  "models"


def get_accuracy_report() -> dict:
    """
    Returns the accuracy metrics (MAE, MSE, R2) for all trained models.

    Returns:
        {
            "linear_regression": {"MAE": ..., "MSE": ..., "R2": ...},
            "decision_tree":     {"MAE": ..., "MSE": ..., "R2": ...},
            "random_forest":     {"MAE": ..., "MSE": ..., "R2": ...},
        }
    """
    path = os.path.join(MODELS_DIR, "accuracy_report.pkl")
    if not os.path.exists(path):
        raise FileNotFoundError(
            "accuracy_report.pkl not found. Run `python -m ml.train` first."
        )
    
    with open(path, "rb") as f:
        return pickle.load(f)