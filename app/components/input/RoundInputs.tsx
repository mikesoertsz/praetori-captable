"use client";

import { FundingRound } from "@/app/lib/types";

interface RoundInputsProps {
  selectedRound: FundingRound | null;
  onUpdateRound: (field: keyof FundingRound, value: string | number) => void;
}

export default function RoundInputs({
  selectedRound,
  onUpdateRound,
}: RoundInputsProps) {
  if (!selectedRound) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Round Planning</h3>
        <p className="text-sm text-gray-600">Select a round to configure</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Round Planning</h3>

      <div>
        <label className="block text-sm font-medium">Round Name</label>
        <input
          type="text"
          value={selectedRound.name}
          onChange={(e) => onUpdateRound("name", e.target.value)}
          className="w-full p-2 border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Pre-money Valuation (€)
        </label>
        <input
          type="number"
          value={selectedRound.preMoneyValuation}
          onChange={(e) =>
            onUpdateRound("preMoneyValuation", Number(e.target.value))
          }
          className="w-full p-2 border"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Amount to Raise (€)</label>
        <input
          type="number"
          value={selectedRound.amountRaised}
          onChange={(e) =>
            onUpdateRound("amountRaised", Number(e.target.value))
          }
          className="w-full p-2 border"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Option Pool Size (%)
        </label>
        <input
          type="number"
          value={selectedRound.optionPoolSize}
          onChange={(e) =>
            onUpdateRound("optionPoolSize", Number(e.target.value))
          }
          className="w-full p-2 border"
          min="0"
          max="100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Advisor Allocation (%)
        </label>
        <input
          type="number"
          value={selectedRound.advisors}
          onChange={(e) => onUpdateRound("advisors", Number(e.target.value))}
          className="w-full p-2 border"
          min="0"
          max="100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Option Pool Refresh</label>
        <select
          value={selectedRound.optionPoolRefresh}
          onChange={(e) => onUpdateRound("optionPoolRefresh", e.target.value)}
          className="w-full p-2 border"
        >
          <option value="pre-money">Pre-money</option>
          <option value="post-money">Post-money</option>
        </select>
      </div>
    </div>
  );
}
