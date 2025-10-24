"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFundingStore } from "@/app/store/fundingStore";

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

      <div className="grid grid-cols-2 gap-2">
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
                const inputValue = e.target.value;
                // Handle empty input or invalid values
                if (
                  inputValue === "" ||
                  inputValue === "0" ||
                  inputValue === "01"
                ) {
                  updateRound(selectedRoundId, "amountRaised", 0);
                  return;
                }

                const amountInMillions = Math.max(
                  parseFloat(inputValue) || 0,
                  0
                );
                const amountRaised = Math.round(amountInMillions * 1000000);
                updateRound(selectedRoundId, "amountRaised", amountRaised);
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                // Ensure proper formatting on blur
                const value = parseFloat(e.target.value) || 0;
                e.target.value = value.toString();
              }}
              className="h-8 bg-white pl-8"
              min="0"
              step="0.1"
              placeholder="0"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              M
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
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
      </div>
    </div>
  );
}
