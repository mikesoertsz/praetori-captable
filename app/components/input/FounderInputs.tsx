"use client";

import { Founder } from "@/app/lib/types";

interface FounderInputsProps {
  founders: Record<string, Founder>;
  onUpdateFounder: (
    id: string,
    field: keyof Founder,
    value: string | number
  ) => void;
}

export default function FounderInputs({
  founders,
  onUpdateFounder,
}: FounderInputsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Founders</h3>
      {Object.entries(founders).map(([id, founder]) => (
        <div key={id} className="space-y-2">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={founder.name}
              onChange={(e) => onUpdateFounder(id, "name", e.target.value)}
              className="w-full p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Ownership %</label>
            <input
              type="number"
              value={founder.ownership}
              onChange={(e) =>
                onUpdateFounder(id, "ownership", Number(e.target.value))
              }
              className="w-full p-2 border"
              min="0"
              max="100"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
