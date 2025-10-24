import { FundingRound, CapTable } from "./types";

export function calculateRoundMetrics(round: FundingRound): FundingRound {
  // Calculate post-money valuation
  const postMoneyValuation = round.preMoneyValuation + round.amountRaised;

  // Calculate investor ownership based on amount raised and post-money valuation
  const newInvestorOwnership = (round.amountRaised / postMoneyValuation) * 100;

  // Handle option pool refresh logic
  let optionPoolSize = round.optionPoolSize;
  let foundersOwnership: number;
  let investorsOwnership: number;

  if (round.optionPoolRefresh === "pre-money") {
    // Option pool is created before new investment, diluting existing shareholders
    const preOptionPoolFounders = round.capTable?.founders ?? 100;
    const preOptionPoolInvestors = round.capTable?.investors ?? 0;

    // Calculate ownership after option pool creation
    const totalPreOptionPool = preOptionPoolFounders + preOptionPoolInvestors;
    const foundersAfterOptionPool =
      (preOptionPoolFounders / totalPreOptionPool) * (100 - optionPoolSize);
    const investorsAfterOptionPool =
      (preOptionPoolInvestors / totalPreOptionPool) * (100 - optionPoolSize);

    // Then apply new investor dilution
    const remainingAfterNewInvestor =
      100 - newInvestorOwnership - optionPoolSize;
    foundersOwnership =
      (foundersAfterOptionPool /
        (foundersAfterOptionPool + investorsAfterOptionPool)) *
      remainingAfterNewInvestor;
    investorsOwnership =
      newInvestorOwnership +
      (investorsAfterOptionPool /
        (foundersAfterOptionPool + investorsAfterOptionPool)) *
        remainingAfterNewInvestor;
  } else {
    // Post-money option pool (default) - option pool is created after new investment
    const remainingForFoundersAndExistingInvestors =
      100 - newInvestorOwnership - optionPoolSize;

    // Distribute remaining ownership proportionally between founders and existing investors
    const existingFounders = round.capTable?.founders ?? 100;
    const existingInvestors = round.capTable?.investors ?? 0;
    const totalExisting = existingFounders + existingInvestors;

    if (totalExisting > 0) {
      foundersOwnership =
        (existingFounders / totalExisting) *
        remainingForFoundersAndExistingInvestors;
      investorsOwnership =
        newInvestorOwnership +
        (existingInvestors / totalExisting) *
          remainingForFoundersAndExistingInvestors;
    } else {
      foundersOwnership = remainingForFoundersAndExistingInvestors;
      investorsOwnership = newInvestorOwnership;
    }
  }

  // Ensure we don't have negative values
  foundersOwnership = Math.max(0, foundersOwnership);
  investorsOwnership = Math.max(0, investorsOwnership);
  optionPoolSize = Math.max(0, optionPoolSize);

  // Normalize to ensure total equals 100%
  const total = foundersOwnership + investorsOwnership + optionPoolSize;
  if (total > 0) {
    const scale = 100 / total;
    foundersOwnership = Math.round(foundersOwnership * scale * 10) / 10;
    investorsOwnership = Math.round(investorsOwnership * scale * 10) / 10;
    optionPoolSize = Math.round(optionPoolSize * scale * 10) / 10;
  }

  const finalCapTable: CapTable = {
    founders: foundersOwnership,
    investors: investorsOwnership,
    optionPool: optionPoolSize,
    investorGroups: round.capTable?.investorGroups || [],
  };

  // Use the calculated new investor ownership as target dilution
  const targetDilution = newInvestorOwnership;

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
