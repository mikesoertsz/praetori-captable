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

export function formatCurrencyInput(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function parseCurrencyInput(value: string): number {
  // Remove commas and parse as number
  const cleanValue = value.replace(/,/g, "");
  const parsed = parseFloat(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
}

export function transformToChartData(round: FundingRound): ChartData {
  return {
    name: "Cap Table",
    founders: round.capTable.founders,
    investors: round.capTable.investors,
    optionPool: round.capTable.optionPool,
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

export function calculateFounderNetWorth(
  founderOwnership: number,
  totalFounderOwnership: number,
  postMoneyValuation: number
): number {
  // Calculate the founder's share of the total founder ownership
  const founderShare = (founderOwnership / 100) * (totalFounderOwnership / 100);
  return founderShare * postMoneyValuation;
}

export function getFounderColor(founderName: string): string {
  const colors: Record<string, string> = {
    Jordi: "#3B82F6", // Blue
    Mike: "#10B981", // Green
    Robin: "#F59E0B", // Amber
  };
  return colors[founderName] || "#6B7280"; // Default gray
}
