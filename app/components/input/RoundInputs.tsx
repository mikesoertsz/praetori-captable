"use client";

import { FundingRound } from "@/app/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrencyInput, parseCurrencyInput } from "@/app/lib/utils";
import {
  calculatePostMoneyValuation,
  calculateInvestorOwnership,
  calculateFounderDilution,
} from "@/app/lib/utils";
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
          value={selectedRound.capTable.investors}
          onChange={(e) => {
            const percentageSold = parseFloat(e.target.value);
            // Calculate pre-money valuation based on percentage sold and amount raised
            const preMoneyValuation =
              (selectedRound.amountRaised * (100 - percentageSold)) /
              percentageSold;
            onUpdateRound("preMoneyValuation", Math.round(preMoneyValuation));
          }}
          className="h-8 bg-white"
          min="1"
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
            type="text"
            value={formatCurrencyInput(selectedRound.amountRaised)}
            onChange={(e) => {
              const amountRaised = parseCurrencyInput(e.target.value);
              // Calculate pre-money valuation based on amount raised and percentage sold
              const preMoneyValuation =
                (amountRaised * (100 - selectedRound.capTable.investors)) /
                selectedRound.capTable.investors;
              onUpdateRound("amountRaised", amountRaised);
              onUpdateRound("preMoneyValuation", Math.round(preMoneyValuation));
            }}
            className="h-8 bg-white pl-8"
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="option-pool-size" className="text-sm">
          Option Pool Size (%)
        </Label>
        <Input
          id="option-pool-size"
          type="number"
          value={selectedRound.optionPoolSize}
          onChange={(e) =>
            onUpdateRound("optionPoolSize", Number(e.target.value))
          }
          className="h-8 bg-white"
          min="0"
          max="100"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="advisor-allocation" className="text-sm">
          Advisor Allocation (%)
        </Label>
        <Input
          id="advisor-allocation"
          type="number"
          value={selectedRound.advisors}
          onChange={(e) => onUpdateRound("advisors", Number(e.target.value))}
          className="h-8 bg-white"
          min="0"
          max="100"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="option-pool-refresh" className="text-sm">
          Option Pool Refresh
        </Label>
        <select
          id="option-pool-refresh"
          value={selectedRound.optionPoolRefresh}
          onChange={(e) => onUpdateRound("optionPoolRefresh", e.target.value)}
          className="flex h-8 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="pre-money">Pre-money</option>
          <option value="post-money">Post-money</option>
        </select>
      </div>

      {/* Calculated fields - Available for All Rounds */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">
          Post-money Valuation
        </Label>
        <div className="h-8 w-full rounded-md border border-input bg-gray-50 px-3 py-1 text-sm flex items-center">
          {formatCurrencyInput(selectedRound.postMoneyValuation)}
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">
          Total Dilution
        </Label>
        <div className="h-8 w-full rounded-md border border-input bg-gray-50 px-3 py-1 text-sm flex items-center">
          {selectedRound.targetDilution.toFixed(1)}%
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">
          Investor Ownership
        </Label>
        <div className="h-8 w-full rounded-md border border-input bg-gray-50 px-3 py-1 text-sm flex items-center">
          {selectedRound.capTable.investors.toFixed(1)}%
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">
          Founder Ownership (After Dilution)
        </Label>
        <div className="h-8 w-full rounded-md border border-input bg-gray-50 px-3 py-1 text-sm flex items-center">
          {selectedRound.capTable.founders.toFixed(1)}%
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">
          Price per Share (Implied)
        </Label>
        <div className="h-8 w-full rounded-md border border-input bg-gray-50 px-3 py-1 text-sm flex items-center">
          €{(selectedRound.postMoneyValuation / 1000000).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
