import os
import pickle
import numpy as np
import logging
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

MODELS_DIR = "models"
DATA_PATH = "dataset/Automobile_data.csv"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

def load_and_clean(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)
    df.replace("?", np.nan, inplace=True)

    numeric_cols = ["normalized-losses","wheel-base","length","width","height","curb-weight","engine-size",
                     "bore", "stroke", "horsepower","compression-ratio", "peak-rpm","city-mpg","highway-mpg", "price"]
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    return df



def prepare_features(df: pd.DataFrame):
    x = df.drop("price", axis=1)
    y = df["price"]

    x = pd.get_dummies(x)

    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.2, random_state=42
    )

    # Drop NaN rows (align x and y)
    train = pd.concat([x_train, y_train], axis=1).dropna()
    test = pd.concat([x_test, y_test], axis=1).dropna()

    x_train_c = train.drop(columns=["price"])
    y_train_c = train["price"]
    x_test_c = test.drop(columns=["price"])
    y_test_c = test["price"]

    scaler = StandardScaler()
    scaler.fit(x_train_c)  # fit only on train

    return x_train_c, x_test_c, y_train_c, y_test_c, scaler


def evaluate(y_true, y_pred) -> dict:
    return {
        "MAE": round(mean_absolute_error(y_true, y_pred), 4),
        "MSE": round(mean_squared_error(y_true, y_pred), 4),
        "R2": round(r2_score(y_true, y_pred), 4),
    }


def train_and_save():
    os.makedirs(MODELS_DIR, exist_ok=True)

    logger.info("Loading and cleaning data...")
    df = load_and_clean(DATA_PATH)
    x_train, x_test, y_train, y_test, scaler = prepare_features(df)

    feature_columns = x_train.columns.tolist()

    results = {}

    # ── 1. Linear Regression ──────────────────────────────────────
    logger.info("🔵 Training Linear Regression...")
    lr_model = LinearRegression()
    lr_model.fit(x_train, y_train)
    y_pred_lr = lr_model.predict(x_test)
    results["linear_regression"] = evaluate(y_test, y_pred_lr)

    # ── 2. Decision Tree ──────────────────────────────────────────
    logger.info("Training Decision Tree...")
    dt_model = DecisionTreeRegressor(random_state=42)
    dt_model.fit(x_train, y_train)
    y_pred_dt = dt_model.predict(x_test)
    results["decision_tree"] = evaluate(y_test, y_pred_dt)

    # ── 3. Random Forest ──────────────────────────────────────────
    logger.info("🟢 Training Random Forest...")
    rf_model = RandomForestRegressor(n_estimators=200, random_state=42)
    rf_model.fit(x_train, y_train)
    y_pred_rf = rf_model.predict(x_test)
    results["random_forest"] = evaluate(y_test, y_pred_rf)

    # ── Save artifacts ────────────────────────────────────────────
    logger.info("Saving models and artifacts...")
    pickle.dump(lr_model,              open(f"{MODELS_DIR}/linear_regression.pkl", "wb"))
    pickle.dump(dt_model,              open(f"{MODELS_DIR}/decision_tree.pkl",     "wb"))
    pickle.dump(rf_model,              open(f"{MODELS_DIR}/random_forest.pkl",     "wb"))
    pickle.dump(scaler,          open(f"{MODELS_DIR}/scaler.pkl",            "wb"))
    pickle.dump(feature_columns, open(f"{MODELS_DIR}/feature_columns.pkl",   "wb"))
    pickle.dump(results,         open(f"{MODELS_DIR}/accuracy_report.pkl",   "wb"))

    logger.info("Training complete! Accuracy report:")
    for model_name, metrics in results.items():
        logger.info(f"{model_name}: {metrics}")

    return results


if __name__ == "__main__":
    train_and_save()