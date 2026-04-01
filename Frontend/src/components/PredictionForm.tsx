import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField, NumberInput, SelectInput } from "@/components/FormInputs";
import { demoExamples } from "@/lib/demoData";
import {
  makeOptions, fuelTypeOptions, aspirationOptions, numDoorsOptions,
  bodyStyleOptions, driveWheelsOptions, engineLocationOptions,
  engineTypeOptions, numCylindersOptions, fuelSystemOptions,
} from "@/lib/formOptions";
import type { CarInput } from "@/lib/api";
import { Loader2 } from "lucide-react";

const defaultValues: CarInput = {
  symboling: 0, "normalized-losses": 100, make: "toyota", "fuel-type": "gas",
  aspiration: "std", "num-of-doors": "four", "body-style": "sedan", "drive-wheels": "fwd",
  "engine-location": "front", "wheel-base": 100, length: 170, width: 65, height: 53,
  "curb-weight": 2300, "engine-type": "ohc", "num-of-cylinders": "four", "engine-size": 120,
  "fuel-system": "mpfi", bore: 3.3, stroke: 3.4, "compression-ratio": 9.0,
  horsepower: 100, "peak-rpm": 5500, "city-mpg": 25, "highway-mpg": 30,
};

interface PredictionFormProps {
  onSubmit: (data: CarInput) => void;
  isLoading: boolean;
}

export default function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const [form, setForm] = useState<CarInput>(defaultValues);

  const setField = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const numField = (key: keyof CarInput, label: string) => (
    <FormField label={label} key={key}>
      <NumberInput
        value={form[key] as number}
        onChange={(e) => setField(key, parseFloat(e.target.value) || 0)}
      />
    </FormField>
  );

  const selectField = (key: keyof CarInput, label: string, options: string[]) => (
    <FormField label={label} key={key}>
      <SelectInput
        options={options}
        value={form[key] as string}
        onChange={(e) => setField(key, e.target.value)}
      />
    </FormField>
  );

  return (
    <div className="space-y-6">
      {/* Demo buttons */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Demo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {demoExamples.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setForm(ex.data)}
              className="glass-card rounded-lg p-4 text-left hover:border-primary/50 transition-all group"
            >
              <span className="text-2xl">{ex.emoji}</span>
              <p className="font-semibold text-foreground mt-1">{ex.label}</p>
              <p className="text-xs text-muted-foreground">{ex.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Form fields */}
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">General</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {numField("symboling", "Symboling")}
            {numField("normalized-losses", "Normalized Losses")}
            {selectField("make", "Make", makeOptions)}
            {selectField("fuel-type", "Fuel Type", fuelTypeOptions)}
            {selectField("aspiration", "Aspiration", aspirationOptions)}
            {selectField("num-of-doors", "Doors", numDoorsOptions)}
            {selectField("body-style", "Body Style", bodyStyleOptions)}
            {selectField("drive-wheels", "Drive Wheels", driveWheelsOptions)}
            {selectField("engine-location", "Engine Location", engineLocationOptions)}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Dimensions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {numField("wheel-base", "Wheel Base")}
            {numField("length", "Length")}
            {numField("width", "Width")}
            {numField("height", "Height")}
            {numField("curb-weight", "Curb Weight")}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Engine & Performance</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectField("engine-type", "Engine Type", engineTypeOptions)}
            {selectField("num-of-cylinders", "Cylinders", numCylindersOptions)}
            {numField("engine-size", "Engine Size")}
            {selectField("fuel-system", "Fuel System", fuelSystemOptions)}
            {numField("bore", "Bore")}
            {numField("stroke", "Stroke")}
            {numField("compression-ratio", "Compression Ratio")}
            {numField("horsepower", "Horsepower")}
            {numField("peak-rpm", "Peak RPM")}
            {numField("city-mpg", "City MPG")}
            {numField("highway-mpg", "Highway MPG")}
          </div>
        </div>

        <Button type="submit" size="lg" disabled={isLoading} className="w-full sm:w-auto gradient-primary text-primary-foreground border-0 animate-pulse-glow">
          {isLoading ? <><Loader2 className="animate-spin mr-2" /> Predicting...</> : "Predict Price"}
        </Button>
      </form>
    </div>
  );
}
