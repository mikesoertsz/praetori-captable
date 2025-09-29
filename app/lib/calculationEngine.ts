import { FundingRound, CapTable } from "./types";

export function calculateRoundMetrics(
  round: FundingRound,
  _previousRound?: FundingRound
): FundingRound {
  // Calculate post-money valuation
  const postMoneyValuation = round.preMoneyValuation + round.amountRaised;

  // Calculate investor ownership percentage based on amount raised vs post-money valuation
  const investorOwnership = (round.amountRaised / postMoneyValuation) * 100;

  // Calculate total dilution (investor ownership + option pool)
  const totalDilution = investorOwnership + round.optionPoolSize;

  // Calculate remaining founder ownership (must be 100% - total dilution)
  const remainingFounderOwnership = 100 - totalDilution;

  // Ensure founder ownership is never negative
  const finalFounderOwnership = Math.max(0, remainingFounderOwnership);

  // If total exceeds 100%, scale down proportionally
  let finalCapTable: CapTable;
  if (totalDilution > 100) {
    const scaleFactor = 100 / totalDilution;
    finalCapTable = {
      founders: Math.max(
        0,
        100 - (investorOwnership + round.optionPoolSize) * scaleFactor
      ),
      investors: investorOwnership * scaleFactor,
      optionPool: round.optionPoolSize * scaleFactor,
      investorGroups: round.capTable.investorGroups || [], // Preserve investor groups
    };
  } else {
    finalCapTable = {
      founders: finalFounderOwnership,
      investors: investorOwnership,
      optionPool: round.optionPoolSize,
      investorGroups: round.capTable.investorGroups || [], // Preserve investor groups
    };
  }

  return {
    ...round,
    postMoneyValuation,
    targetDilution: investorOwnership, // Target dilution is just the investor ownership
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
