# Car_Price_Prediction

Invoke-RestMethod -Uri "http://127.0.0.1:8000/predict/allmodels" -Method Post -Headers @{ "Content-Type" = "application/json" } -Body '{
  "symboling": 1,
  "normalized-losses": 120,
  "make": "toyota",
  "fuel-type": "gas",
  "aspiration": "std",
  "num-of-doors": "four",
  "body-style": "sedan",
  "drive-wheels": "fwd",
  "engine-location": "front",
  "wheel-base": 102.4,
  "length": 176.6,
  "width": 66.5,
  "height": 54.3,
  "curb-weight": 2337,
  "engine-type": "ohc",
  "num-of-cylinders": "four",
  "engine-size": 122,
  "fuel-system": "mpfi",
  "bore": 3.31,
  "stroke": 3.54,
  "compression-ratio": 9.0,
  "horsepower": 102,
  "peak-rpm": 5500,
  "city-mpg": 24,
  "highway-mpg": 30
}'