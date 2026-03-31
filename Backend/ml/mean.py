import os
import pickle
import logging
import pandas as pd
import numpy as np

DATA_PATH = "dataset/Automobile_data.csv"
MODELS_DIR = "models"

logging.basicConfig(
    level=logging.INFO,
)

logger = logging.getLogger(__name__)

def calculate_and_save_means():
    os.makedirs(MODELS_DIR, exist_ok=True)

    logger.info("📊 Loading dataset...")
    df = pd.read_csv(DATA_PATH)

    # Replace '?' with NaN
    df.replace("?", np.nan, inplace=True)

    # Convert numeric columns
    numeric_cols = [
        "normalized-losses","wheel-base","length","width","height","curb-weight",
        "engine-size","bore","stroke","horsepower","compression-ratio",
        "peak-rpm","city-mpg","highway-mpg","price"
    ]

    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    logger.info("Calculating means...")

    means = df[numeric_cols].mean().to_dict()

    # Save means
    with open(os.path.join(MODELS_DIR, "means.pkl"), "wb") as f:
        pickle.dump(means, f)

    logger.info("Means saved to models/means.pkl")


if __name__ == "__main__":
    calculate_and_save_means()