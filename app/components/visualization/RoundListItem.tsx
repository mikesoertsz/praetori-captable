"use client";

import { FundingRound, FundingData } from "@/app/lib/types";
import { formatCurrency, calculateFounderNetWorth } from "@/app/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Percent,
  Target,
} from "lucide-react";
import OwnershipChart from "./OwnershipChart";

interface RoundListItemProps {
  round: FundingRound;
  founders: FundingData["founders"];
  previousRound?: FundingRound;
}

export default function RoundListItem({
  round,
  founders,
  previousRound,
}: RoundListItemProps) {
  // Calculate percentage changes from previous round
  const valuationChange = previousRound
    ? ((round.preMoneyValuation - previousRound.postMoneyValuation) /
        previousRound.postMoneyValuation) *
      100
    : 0;

  const amountChange = previousRound
    ? ((round.amountRaised - previousRound.amountRaised) /
        previousRound.amountRaised) *
      100
    : 0;

  const dilutionChange = previousRound
    ? round.targetDilution - previousRound.targetDilution
    : 0;

  // Calculate total founder net worth
  const totalFounderNetWorth = Object.entries(founders).reduce(
    (total, [key, founder]) => {
      const netWorth = calculateFounderNetWorth(
        founder.ownership,
        round.capTable.founders,
        round.postMoneyValuation
      );
      return total + netWorth;
    },
    0
  );

  // Calculate investor dilution from previous round
  const previousInvestorDilution = previousRound
    ? (previousRound.capTable.investors * (100 - round.targetDilution)) / 100
    : 0;

  // Calculate share allocation properly across rounds
  // Each round issues new shares, increasing the total share count
  const baseShares = 1000000; // Starting shares before any funding

  // Calculate total shares after this round based on post-money valuation
  // Assuming a base price per share, total shares = post-money valuation / price per share
  const pricePerShare = 1; // €1 per share base price
  const totalShares = Math.round(round.postMoneyValuation / pricePerShare);

  // Calculate new shares issued in this round
  const newSharesIssued =
    totalShares -
    (previousRound
      ? Math.round(previousRound.postMoneyValuation / pricePerShare)
      : baseShares);

  // Calculate shares for each category based on their ownership percentages
  const investorShares = Math.round(
    (round.capTable.investors / 100) * totalShares
  );
  const founderShares = Math.round(
    (round.capTable.founders / 100) * totalShares
  );
  const optionPoolShares = Math.round(
    (round.capTable.optionPool / 100) * totalShares
  );
  const advisorShares = Math.round(
    (round.capTable.advisors / 100) * totalShares
  );

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-3 h-3" />;
    if (value < 0) return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  const getTrendColor = (value: number, reverse = false) => {
    if (reverse) {
      return value > 0
        ? "text-red-600"
        : value < 0
        ? "text-green-600"
        : "text-gray-600";
    }
    return value > 0
      ? "text-green-600"
      : value < 0
      ? "text-red-600"
      : "text-gray-600";
  };

  const formatPercentage = (value: number) => {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  return (
    <li className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      {/* Round Header */}
      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-900">
          {round.name} Round
        </h3>
        <p className="text-xs text-gray-600 mt-1">{round.summary}</p>

        {/* SAFE-specific information */}
        {round.id === "seed" && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-xs font-semibold text-blue-900 mb-2">
              SAFE Details
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-blue-700 font-medium">
                  Investment Amount:
                </span>
                <span className="text-blue-900 ml-1">
                  {formatCurrency(round.amountRaised)}
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Ownership %:</span>
                <span className="text-blue-900 ml-1">
                  {round.capTable.investors.toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">
                  Pre-money Valuation:
                </span>
                <span className="text-blue-900 ml-1">
                  {formatCurrency(round.preMoneyValuation)}
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">
                  Post-money Valuation:
                </span>
                <span className="text-blue-900 ml-1">
                  {formatCurrency(round.postMoneyValuation)}
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">
                  Price per Share:
                </span>
                <span className="text-blue-900 ml-1">
                  €{(round.postMoneyValuation / 1000000).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">
                  Total Dilution:
                </span>
                <span className="text-blue-900 ml-1">
                  {round.targetDilution.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Data Cards */}
        <div className="space-y-4">
          {/* Main Data Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Amount Raised Card - FIRST */}
            <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
                  Amount raised
                </span>
                {previousRound && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 ${getTrendColor(
                      amountChange
                    )}`}
                  >
                    {getTrendIcon(amountChange)}
                    <span className="text-xs font-medium">
                      {formatPercentage(amountChange)}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-md font-bold text-gray-900 mb-1">
                {formatCurrency(round.amountRaised)}
              </div>
              <div className="text-xs text-gray-500">
                {amountChange > 0
                  ? "Increased funding round"
                  : amountChange < 0
                  ? "Smaller round size"
                  : "Initial funding round"}
              </div>
            </div>

            {/* Pre-Money Valuation Card - SECOND */}
            <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
                  Pre-money valuation
                </span>
                {previousRound && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 ${getTrendColor(
                      valuationChange
                    )}`}
                  >
                    {getTrendIcon(valuationChange)}
                    <span className="text-xs font-medium">
                      {formatPercentage(valuationChange)}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-md font-bold text-gray-900 mb-1">
                {formatCurrency(round.preMoneyValuation)}
              </div>
              <div className="text-xs text-gray-500">
                {valuationChange > 0
                  ? "Strong valuation growth"
                  : valuationChange < 0
                  ? "Valuation adjustment"
                  : "Baseline valuation"}
              </div>
            </div>

            {/* Post-Money Valuation Card - THIRD */}
            <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
                  Post-money valuation
                </span>
                {previousRound && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 ${getTrendColor(
                      valuationChange
                    )}`}
                  >
                    {getTrendIcon(valuationChange)}
                    <span className="text-xs font-medium">
                      {formatPercentage(valuationChange)}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-md font-bold text-gray-900 mb-1">
                {formatCurrency(round.postMoneyValuation)}
              </div>
              <div className="text-xs text-gray-500">
                {round.postMoneyValuation >= 1000000000
                  ? "Unicorn status achieved"
                  : "Strong company valuation"}
              </div>
            </div>

            {/* Dilution Card - FOURTH */}
            <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
                  Founder dilution
                </span>
                {previousRound && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 ${getTrendColor(
                      dilutionChange,
                      true
                    )}`}
                  >
                    {getTrendIcon(-dilutionChange)}
                    <span className="text-xs font-medium">
                      {formatPercentage(dilutionChange)}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-md font-bold text-gray-900 mb-1">
                {round.targetDilution.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500">
                {dilutionChange > 0
                  ? "Increased dilution impact"
                  : dilutionChange < 0
                  ? "Reduced dilution"
                  : "Standard dilution level"}
              </div>
            </div>
          </div>

          {/* Investor Information Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* New Investor Ownership Card */}
            <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-medium text-gray-500">
                  New investor ownership
                </span>
              </div>
              <div className="text-md font-bold text-gray-900 mb-1">
                {round.capTable.investors.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500">
                {formatCurrency(round.amountRaised)} for{" "}
                {round.capTable.investors.toFixed(1)}% equity
              </div>
            </div>

            {/* Previous Investor Dilution Card */}
            {previousRound && (
              <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-3 h-3 text-gray-400" />
                  <span className="text-xs font-medium text-gray-500">
                    Previous investor dilution
                  </span>
                </div>
                <div className="text-md font-bold text-gray-900 mb-1">
                  {previousInvestorDilution.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">
                  From {previousRound.capTable.investors.toFixed(1)}% to{" "}
                  {previousInvestorDilution.toFixed(1)}%
                </div>
              </div>
            )}
          </div>

          {/* Share Allocation Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Share Allocation Card */}
            <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-medium text-gray-500">
                  Share allocation
                </span>
              </div>
              <div className="text-md font-bold text-gray-900 mb-1">
                {totalShares.toLocaleString()} shares
              </div>
              <div className="text-xs text-gray-500">
                Total: {totalShares.toLocaleString()} shares • New:{" "}
                {newSharesIssued.toLocaleString()}
              </div>
            </div>

            {/* Option Pool Card */}
            <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-medium text-gray-500">
                  Option pool
                </span>
              </div>
              <div className="text-md font-bold text-gray-900 mb-1">
                {round.optionPoolSize}%
              </div>
              <div className="text-xs text-gray-500">
                {optionPoolShares.toLocaleString()} shares •{" "}
                {round.optionPoolRefresh === "pre-money"
                  ? "Pre-money"
                  : "Post-money"}
              </div>
            </div>
          </div>

          {/* Individual Founder Cards */}
          <div className="rounded-md bg-slate-100 p-4">
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-700">
                Individual founder net worth
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(founders)
                  .sort(([keyA, founderA], [keyB, founderB]) => {
                    // Put Jordi first, then Mike
                    if (founderA.name === "Jordi") return -1;
                    if (founderB.name === "Jordi") return 1;
                    if (founderA.name === "Mike") return -1;
                    if (founderB.name === "Mike") return 1;
                    return 0;
                  })
                  .map(([key, founder]) => {
                    const netWorth = calculateFounderNetWorth(
                      founder.ownership,
                      round.capTable.founders,
                      round.postMoneyValuation
                    );
                    // Calculate founder's post-dilution ownership percentage
                    const postDilutionOwnership =
                      (founder.ownership / 100) *
                      (round.capTable.founders / 100) *
                      100;
                    return (
                      <div
                        key={key}
                        className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-700">
                            {founder.name}
                          </span>
                          <span className="text-md font-semibold text-gray-900">
                            {formatCurrency(netWorth)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {postDilutionOwnership.toFixed(1)}% ownership
                          (post-dilution)
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Ownership Chart */}
        <div>
          <OwnershipChart data={round.capTable} />
        </div>
      </div>
    </li>
  );
}
