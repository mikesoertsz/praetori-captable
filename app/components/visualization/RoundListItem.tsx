"use client";

import { FundingRound } from "@/app/lib/types";
import { formatCurrency } from "@/app/lib/utils";
import OwnershipChart from "./OwnershipChart";

interface RoundListItemProps {
  round: FundingRound;
}

export default function RoundListItem({ round }: RoundListItemProps) {
  return (
    <li className="border p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Left side - Round details */}
        <div>
          <h3 className="text-lg font-semibold">{round.name} Round</h3>
          <div className="space-y-2 mt-2">
            <div>Pre-money: {formatCurrency(round.preMoneyValuation)}</div>
            <div>Amount Raised: {formatCurrency(round.amountRaised)}</div>
            <div>Post-money: {formatCurrency(round.postMoneyValuation)}</div>
            <div>Dilution: {round.targetDilution.toFixed(1)}%</div>
            <p className="text-sm mt-3">{round.summary}</p>
          </div>
        </div>

        {/* Right side - Stacked bar chart */}
        <div>
          <OwnershipChart data={round.capTable} />
        </div>
      </div>
    </li>
  );
}
