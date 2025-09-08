import { FundingRound, ChartData } from "./types";

export function formatCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `€${(amount / 1000000000).toFixed(1)}B`;
  } else if (amount >= 1000000) {
    return `€${(amount / 1000000).toFixed(0)}M`;
  } else if (amount >= 1000) {
    return `€${(amount / 1000).toFixed(0)}K`;
  }
  return `€${amount.toFixed(0)}`;
}

export function transformToChartData(round: FundingRound): ChartData {
  return {
    name: "Cap Table",
    founders: round.capTable.founders,
    investors: round.capTable.investors,
    optionPool: round.capTable.optionPool,
    advisors: round.capTable.advisors,
  };
}

export function calculatePostMoneyValuation(
  preMoney: number,
  amountRaised: number
): number {
  return preMoney + amountRaised;
}

export function calculateInvestorOwnership(
  amountRaised: number,
  postMoneyValuation: number
): number {
  return (amountRaised / postMoneyValuation) * 100;
}

export function calculateFounderDilution(
  investorOwnership: number,
  optionPoolSize: number,
  advisorAllocation: number
): number {
  return investorOwnership + optionPoolSize + advisorAllocation;
}
