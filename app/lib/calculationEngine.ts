import { FundingRound, CapTable } from "./types";

export function calculateRoundMetrics(round: FundingRound): FundingRound {
  // Calculate post-money valuation
  const postMoneyValuation = round.preMoneyValuation + round.amountRaised;

  // Preserve provided cap table and target dilution from data to reflect scenario inputs
  const providedInvestors = round.capTable?.investors ?? 0;
  const providedFounders = round.capTable?.founders ?? 0;
  const providedOptionPool = round.capTable?.optionPool ?? round.optionPoolSize;

  // Normalize to ensure totals equal 100%
  const totalProvided =
    providedFounders + providedInvestors + providedOptionPool;
  const scale = totalProvided > 0 ? 100 / totalProvided : 1;

  const finalCapTable: CapTable = {
    founders: Math.max(0, providedFounders * scale),
    investors: Math.max(0, providedInvestors * scale),
    optionPool: Math.max(0, providedOptionPool * scale),
    investorGroups: round.capTable?.investorGroups || [],
  };

  const targetDilution = round.targetDilution ?? finalCapTable.investors;

  return {
    ...round,
    postMoneyValuation,
    targetDilution,
    capTable: finalCapTable,
  };
}

export function calculateCumulativeDilution(rounds: FundingRound[]): number {
  return rounds.reduce((total, round) => total + round.targetDilution, 0);
}

export function isUnicornStatus(postMoneyValuation: number): boolean {
  return postMoneyValuation >= 1000000000; // €1B+
}

export function generateRoundSummary(round: FundingRound): string {
  const preMoney = round.preMoneyValuation / 1000000;
  const amount = round.amountRaised / 1000000;
  const postMoney = round.postMoneyValuation / 1000000;

  return `Raising €${amount}M at €${preMoney}M pre-money valuation. This gives investors ${round.targetDilution.toFixed(
    1
  )}% ownership and establishes a €${postMoney}M post-money valuation. Founders retain ${round.capTable.founders.toFixed(
    1
  )}% after accounting for the ${round.optionPoolSize}% option pool.`;
}
