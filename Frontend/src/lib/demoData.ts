import type { CarInput } from "./api";

export const demoExamples: { label: string; emoji: string; description: string; data: CarInput }[] = [
  {
    label: "Economy Car",
    emoji: "🚗",
    description: "Fuel efficient & affordable",
    data: {
      symboling: 1, "normalized-losses": 120, make: "toyota", "fuel-type": "gas",
      aspiration: "std", "num-of-doors": "four", "body-style": "sedan", "drive-wheels": "fwd",
      "engine-location": "front", "wheel-base": 102.4, length: 176.6, width: 66.5, height: 54.3,
      "curb-weight": 2337, "engine-type": "ohc", "num-of-cylinders": "four", "engine-size": 122,
      "fuel-system": "mpfi", bore: 3.31, stroke: 3.54, "compression-ratio": 9.0,
      horsepower: 102, "peak-rpm": 5500, "city-mpg": 24, "highway-mpg": 30,
    },
  },
  {
    label: "Mid-range Car",
    emoji: "🚙",
    description: "Balanced performance",
    data: {
      symboling: 0, "normalized-losses": 100, make: "honda", "fuel-type": "gas",
      aspiration: "std", "num-of-doors": "four", "body-style": "sedan", "drive-wheels": "fwd",
      "engine-location": "front", "wheel-base": 99.8, length: 178.0, width: 67.0, height: 52.5,
      "curb-weight": 2500, "engine-type": "ohc", "num-of-cylinders": "four", "engine-size": 130,
      "fuel-system": "mpfi", bore: 3.47, stroke: 2.68, "compression-ratio": 9.5,
      horsepower: 110, "peak-rpm": 6000, "city-mpg": 26, "highway-mpg": 32,
    },
  },
  {
    label: "Performance Car",
    emoji: "🏎️",
    description: "High performance",
    data: {
      symboling: 2, "normalized-losses": 150, make: "bmw", "fuel-type": "gas",
      aspiration: "turbo", "num-of-doors": "two", "body-style": "coupe", "drive-wheels": "rwd",
      "engine-location": "front", "wheel-base": 101.2, length: 176.8, width: 64.8, height: 54.3,
      "curb-weight": 2800, "engine-type": "ohc", "num-of-cylinders": "six", "engine-size": 152,
      "fuel-system": "mpfi", bore: 3.68, stroke: 3.47, "compression-ratio": 8.5,
      horsepower: 160, "peak-rpm": 5500, "city-mpg": 20, "highway-mpg": 25,
    },
  },
];
