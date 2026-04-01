const API_BASE = "http://localhost:8000";

export interface CarInput {
  symboling: number;
  "normalized-losses": number;
  make: string;
  "fuel-type": string;
  aspiration: string;
  "num-of-doors": string;
  "body-style": string;
  "drive-wheels": string;
  "engine-location": string;
  "wheel-base": number;
  length: number;
  width: number;
  height: number;
  "curb-weight": number;
  "engine-type": string;
  "num-of-cylinders": string;
  "engine-size": number;
  "fuel-system": string;
  bore: number;
  stroke: number;
  "compression-ratio": number;
  horsepower: number;
  "peak-rpm": number;
  "city-mpg": number;
  "highway-mpg": number;
}

export interface PredictionResult {
  linear_regression: number;
  decision_tree: number;
  random_forest: number;
}

export interface ModelAccuracy {
  linear_regression: { mae: number; mse: number; r2: number };
  decision_tree: { mae: number; mse: number; r2: number };
  random_forest: { mae: number; mse: number; r2: number };
}

export async function predictAllModels(data: CarInput): Promise<PredictionResult> {
  const res = await fetch(`${API_BASE}/predict/allmodels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Prediction failed: ${res.statusText}`);
  return res.json();
}

export async function getAccuracy(): Promise<ModelAccuracy> {
  const res = await fetch(`${API_BASE}/accuracy/all`);
  if (!res.ok) throw new Error(`Failed to fetch accuracy: ${res.statusText}`);
  return res.json();
}
