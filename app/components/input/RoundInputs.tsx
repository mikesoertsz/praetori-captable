"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { formatCurrencyInput } from "@/app/lib/utils";
import { useFundingStore } from "@/app/store/fundingStore";
import { FundingRound } from "@/app/lib/types";

const CALCULATED_FIELDS = [
  {
    label: "Post-money valuation",
    value: (selectedRound: FundingRound) =>
      `€${formatCurrencyInput(selectedRound.postMoneyValuation)}`,
  },
  {
    label: "Total dilution",
    value: (selectedRound: FundingRound) =>
      `${selectedRound.targetDilution.toFixed(1)}%`,
  },
  {
    label: "Investor ownership",
    value: (selectedRound: FundingRound) =>
      `${selectedRound.capTable.investors.toFixed(1)}%`,
  },
  {
    label: "Founder ownership (after dilution)",
    value: (selectedRound: FundingRound) =>
      `${selectedRound.capTable.founders.toFixed(1)}%`,
  },
  {
    label: "Price per share (implied)",
    value: (selectedRound: FundingRound) =>
      `€${(selectedRound.postMoneyValuation / 1000000).toFixed(2)}`,
  },
];

export default function RoundInputs() {
  const { selectedRoundId, updateRound } = useFundingStore();
  const selectedRound = useFundingStore(
    (state) =>
      state.data.rounds.find((round) => round.id === selectedRoundId) || null
  );
  if (!selectedRound) {
    return (
      <div className="space-y-3">
        <h3 className="text-base font-semibold">Round Planning</h3>
        <p className="text-sm text-muted-foreground">
          Select a round to configure
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold">Round Planning</h3>

      <div className="space-y-1">
        <Label htmlFor="percentage-sold" className="text-sm">
          Percentage Sold (%)
        </Label>
        <Input
          id="percentage-sold"
          type="number"
          value={selectedRound.targetDilution.toFixed(1)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const percentageSold = Math.min(
              Math.max(parseFloat(e.target.value) || 0, 0.1),
              30
            );
            updateRound(selectedRoundId, "targetDilution", percentageSold);
          }}
          className="h-8 bg-white"
          min="0.1"
          max="30"
          step="0.1"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="amount-raised" className="text-sm">
          Amount Raised
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            €
          </span>
          <Input
            id="amount-raised"
            type="number"
            value={selectedRound.amountRaised / 1000000}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const amountInMillions = Math.max(
                parseFloat(e.target.value) || 0,
                0
              );
              const amountRaised = Math.round(amountInMillions * 1000000);
              updateRound(selectedRoundId, "amountRaised", amountRaised);
            }}
            className="h-8 bg-white pl-8"
            min="0"
            step="1"
            placeholder="0"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            M
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="option-pool-size" className="text-sm">
          Option Pool Size (%)
        </Label>
        <Input
          id="option-pool-size"
          type="number"
          value={selectedRound.optionPoolSize.toFixed(1)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(
              Math.max(parseFloat(e.target.value) || 0, 0),
              100
            );
            updateRound(selectedRoundId, "optionPoolSize", value);
          }}
          className="h-8 bg-white"
          min="0"
          max="100"
          step="0.1"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="option-pool-refresh" className="text-sm">
          Option Pool Refresh
        </Label>
        <select
          id="option-pool-refresh"
          value={selectedRound.optionPoolRefresh}
          onChange={(e) =>
            updateRound(selectedRoundId, "optionPoolRefresh", e.target.value)
          }
          className="flex h-8 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="pre-money">Pre-money</option>
          <option value="post-money">Post-money</option>
        </select>
      </div>

      {/* Calculated fields - Available for All Rounds */}
      <div className="bg-white rounded-md p-4 border shadow-sm">
        <h4 className="text-xs mb-4 font-semibold text-gray-900">
          {selectedRound.name}
        </h4>
        <ul className="grid grid-cols-2 gap-4 ">
          {CALCULATED_FIELDS.map((field, index) => (
            <li key={index} className="text-left">
              <div className="text-xl font-semibold text-gray-900">
                {field.value(selectedRound)}
              </div>
              <div className="text-[11px] font-semibold text-indigo-500 uppercase tracking-tight">
                {field.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
