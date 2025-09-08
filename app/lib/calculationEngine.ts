import { FundingRound, CapTable } from "./types";
import {
  calculatePostMoneyValuation,
  calculateInvestorOwnership,
  calculateFounderDilution,
} from "./utils";

export function calculateRoundMetrics(round: FundingRound): FundingRound {
  const postMoneyValuation = calculatePostMoneyValuation(
    round.preMoneyValuation,
    round.amountRaised
  );

  const investorOwnership = calculateInvestorOwnership(
    round.amountRaised,
    postMoneyValuation
  );

  const totalDilution = calculateFounderDilution(
    investorOwnership,
    round.optionPoolSize,
    round.advisors
  );

  // Calculate remaining founder ownership
  const remainingFounderOwnership = 100 - totalDilution;

  const updatedCapTable: CapTable = {
    founders: remainingFounderOwnership,
    investors: investorOwnership,
    optionPool: round.optionPoolSize,
    advisors: round.advisors,
  };

  return {
    ...round,
    postMoneyValuation,
    targetDilution: totalDilution,
    capTable: updatedCapTable,
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
