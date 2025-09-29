"use client";

import { FundingRound, FundingData } from "@/app/lib/types";
import {
  formatCurrency,
  calculateFounderNetWorth,
  getFounderColor,
} from "@/app/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
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
  Object.entries(founders).reduce((total, [, founder]) => {
    const netWorth = calculateFounderNetWorth(
      founder.ownership,
      round.capTable.founders,
      round.postMoneyValuation
    );
    return total + netWorth;
  }, 0);

  // Calculate investor dilution from previous round
  const previousInvestorDilution = previousRound
    ? (previousRound.capTable.investors * (100 - round.targetDilution)) / 100
    : 0;

  // Calculate total shares after this round
  // First round starts with 1M shares, subsequent rounds calculate based on valuation
  const firstRoundShares = 1000000; // 1 million shares for first round
  const totalShares = previousRound
    ? Math.round(
        round.postMoneyValuation /
          (previousRound.postMoneyValuation / firstRoundShares)
      )
    : firstRoundShares;

  // Calculate new shares issued in this round
  const newSharesIssued = totalShares - (previousRound ? firstRoundShares : 0);

  // Calculate shares for each category based on their ownership percentages
  const optionPoolShares = Math.round(
    (round.capTable.optionPool / 100) * totalShares
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
    <div>
      {/* Round Name Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {round.name} Round
        </h3>
        <p className="text-sm text-gray-600">
          Funding round details and ownership breakdown
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Data Cards */}
        <div className="space-y-4">
          {/* Main Data Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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

            {/* Share Allocation Card - FIFTH */}
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

            {/* Option Pool Card - SIXTH */}
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

          {/* Investor Information Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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

          {/* Investor Groups Section */}
          <div className="rounded-md bg-slate-100 p-4">
            <h4 className="text-xs font-medium text-gray-700 mb-3">
              {round.name} Investor Groups
            </h4>
            <div className="space-y-2">
              {round.capTable.investorGroups?.map((group, index) => {
                const currentValuation =
                  (group.ownership * round.postMoneyValuation) / 100;
                const returnMultiple = currentValuation / group.amountInvested;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: `hsl(${240 + index * 60}, 70%, 60%)`,
                        }}
                      />
                      <span className="text-xs font-medium text-gray-700">
                        {group.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-600">
                        {group.ownership.toFixed(1)}% •{" "}
                        {formatCurrency(group.amountInvested)}
                      </div>
                      <div className="text-xs font-medium text-gray-800">
                        {formatCurrency(currentValuation)} (
                        {returnMultiple.toFixed(1)}x)
                      </div>
                    </div>
                  </div>
                );
              }) || (
                <div className="text-xs text-gray-500">
                  No investor groups data available
                </div>
              )}
            </div>
          </div>

          {/* Individual Founder Cards */}
          <div className="rounded-md bg-slate-100 p-4">
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-700">
                Individual founder net worth
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(founders)
                  .sort(([, founderA], [, founderB]) => {
                    // Put Jordi first, then Mike, then Robin
                    if (founderA.name === "Jordi") return -1;
                    if (founderB.name === "Jordi") return 1;
                    if (founderA.name === "Mike") return -1;
                    if (founderB.name === "Mike") return 1;
                    if (founderA.name === "Robin") return -1;
                    if (founderB.name === "Robin") return 1;
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

                    // Calculate vesting based on founder and round
                    let vestedPercentage = 0;
                    let vestingDetails = "";

                    if (round.id === "seed") {
                      if (founder.name === "Jordi" || founder.name === "Mike") {
                        vestedPercentage = 25; // 25% vested (1 year out of 4)
                        vestingDetails = "1yr";
                      } else if (founder.name === "Robin") {
                        vestedPercentage = 4.17; // 2 months out of 48 months
                        vestingDetails = "2mo";
                      }
                    } else {
                      // For later rounds, show cumulative vesting
                      if (founder.name === "Jordi" || founder.name === "Mike") {
                        const yearsVested =
                          1 +
                          (round.id === "series-a"
                            ? 1
                            : round.id === "series-b"
                            ? 2
                            : 3);
                        vestedPercentage = Math.min(
                          (yearsVested / 4) * 100,
                          100
                        );
                        vestingDetails = `${yearsVested}yr`;
                      } else if (founder.name === "Robin") {
                        const monthsVested =
                          2 +
                          (round.id === "series-a"
                            ? 12
                            : round.id === "series-b"
                            ? 24
                            : 36);
                        vestedPercentage = Math.min(
                          (monthsVested / 48) * 100,
                          100
                        );
                        vestingDetails = `${monthsVested}mo`;
                      }
                    }

                    // Calculate accessible net worth (vested portion of total net worth)
                    const accessibleNetWorth =
                      (netWorth * vestedPercentage) / 100;

                    // Calculate ownership change from previous round
                    const previousOwnership = previousRound
                      ? (founder.ownership / 100) *
                        (previousRound.capTable.founders / 100) *
                        100
                      : postDilutionOwnership;
                    const ownershipChange =
                      postDilutionOwnership - previousOwnership;

                    return (
                      <div
                        key={key}
                        className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: getFounderColor(founder.name),
                              }}
                            />
                            <span className="text-xs font-medium text-gray-700">
                              {founder.name}
                            </span>
                            {previousRound && ownershipChange !== 0 && (
                              <div
                                className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 ${getTrendColor(
                                  ownershipChange,
                                  true
                                )}`}
                              >
                                {getTrendIcon(ownershipChange)}
                                <span className="text-xs font-medium">
                                  {formatPercentage(ownershipChange)}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="text-md font-semibold text-gray-900">
                            {formatCurrency(netWorth)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {postDilutionOwnership.toFixed(1)}% ownership
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-xs text-gray-500">
                            Vest: {vestingDetails} (
                            {vestedPercentage.toFixed(1)}%)
                          </div>
                          <div className="text-xs font-medium text-gray-800">
                            {formatCurrency(accessibleNetWorth)} accessible
                          </div>
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
          <OwnershipChart
            capTable={round.capTable}
            founders={founders}
            roundName={round.name}
          />
        </div>
      </div>
    </div>
  );
}
