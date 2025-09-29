"use client";
import { useState } from "react";
import SlidingNumber from "./motion-primitives/sliding-number";

export function SlidingNumberWithSlider({
  label,
  initialValue,
  min = 500,
  max = 100000,
  step = 50,
  className = "mt-2 accent-indigo-950",
}: {
  label: string;
  initialValue: number;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}) {
  const [value, setValue] = useState(initialValue);
  const [width, setWidth] = useState(0);

  return (
    <div className="flex flex-col items-start gap-0">
      <div className="flex items-center gap-2 font-mono">{label}:</div>
      <div className="inline-flex items-center gap-1 font-mono leading-none">
        $<SlidingNumber value={value} />
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => setValue(+e.target.value)}
        className={className}
      />
    </div>
  );
}
