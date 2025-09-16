# Startup Fundraising Technical Framework: Industry-Standard Calculations

## Core Fundraising Mechanics

### 1. Pre-Money vs Post-Money Valuation

```typescript
function calculateValuations(
  amountRaised: number,
  percentageSold: number
): ValuationResult {
  const preMoneyValuation =
    (amountRaised * (100 - percentageSold)) / percentageSold;
  const postMoneyValuation = preMoneyValuation + amountRaised;

  return {
    preMoneyValuation,
    postMoneyValuation,
    amountRaised,
    percentageSold,
  };
}
```

### 2. Share Price Calculation

```typescript
function calculateSharePrice(
  valuation: number,
  totalSharesOutstanding: number
): number {
  return valuation / totalSharesOutstanding;
}
```

### 3. New Shares Issued

```typescript
function calculateNewShares(amountRaised: number, sharePrice: number): number {
  return Math.round(amountRaised / sharePrice);
}
```

## Round-Specific Calculations

### 4. SAFE Conversion (Seed/Pre-Seed)

```typescript
function calculateSAFEConversion(
  safeInvestment: number,
  valuationCap: number,
  discountRate: number,
  conversionValuation: number
): ConversionResult {
  const capPrice = valuationCap / totalSharesOutstanding;
  const discountPrice =
    (conversionValuation * (1 - discountRate / 100)) / totalSharesOutstanding;

  const conversionPrice = Math.min(capPrice, discountPrice);
  const sharesReceived = safeInvestment / conversionPrice;

  return {
    conversionPrice,
    sharesReceived,
    conversionMethod: capPrice < discountPrice ? "cap" : "discount",
    ownershipPercentage:
      (sharesReceived / (totalSharesOutstanding + sharesReceived)) * 100,
  };
}
```

### 5. Convertible Note Conversion

```typescript
function calculateNoteConversion(
  principalAmount: number,
  interestRate: number,
  termMonths: number,
  conversionCap: number,
  discountRate: number,
  conversionValuation: number
): NoteConversionResult {
  const accruedInterest =
    principalAmount * (interestRate / 100) * (termMonths / 12);
  const totalConversionAmount = principalAmount + accruedInterest;

  const capPrice = conversionCap / totalSharesOutstanding;
  const discountPrice =
    (conversionValuation * (1 - discountRate / 100)) / totalSharesOutstanding;

  const conversionPrice = Math.min(capPrice, discountPrice);
  const sharesReceived = totalConversionAmount / conversionPrice;

  return {
    principalAmount,
    accruedInterest,
    totalConversionAmount,
    conversionPrice,
    sharesReceived,
    ownershipPercentage:
      (sharesReceived / (totalSharesOutstanding + sharesReceived)) * 100,
  };
}
```

### 6. Equity Round Dilution

```typescript
function calculateEquityDilution(
  preRoundOwnership: number,
  newInvestorOwnership: number,
  optionPoolRefresh: number
): DilutionResult {
  // Option pool refresh dilutes everyone proportionally
  const postOptionPoolOwnership =
    preRoundOwnership * (1 - optionPoolRefresh / 100);

  // New investor dilution
  const postInvestorOwnership =
    postOptionPoolOwnership * (1 - newInvestorOwnership / 100);

  const totalDilution =
    ((preRoundOwnership - postInvestorOwnership) / preRoundOwnership) * 100;

  return {
    preRoundOwnership,
    postRoundOwnership: postInvestorOwnership,
    totalDilution,
    optionPoolDilution:
      ((preRoundOwnership - postOptionPoolOwnership) / preRoundOwnership) * 100,
    investorDilution:
      ((postOptionPoolOwnership - postInvestorOwnership) /
        postOptionPoolOwnership) *
      100,
  };
}
```

## Investor Protection Mechanisms

### 7. Liquidation Preference

```typescript
function calculateLiquidationPreference(
  investmentAmount: number,
  liquidationMultiple: number,
  companyValue: number,
  ownershipPercentage: number
): LiquidationResult {
  const preferredAmount = investmentAmount * liquidationMultiple;
  const commonValue = (ownershipPercentage / 100) * companyValue;

  const liquidationAmount = Math.min(preferredAmount, companyValue);
  const participationAmount = Math.max(0, commonValue - preferredAmount);

  return {
    preferredAmount,
    commonValue,
    liquidationAmount,
    participationAmount,
    totalReturn: liquidationAmount + participationAmount,
  };
}
```

### 8. Anti-Dilution Protection (Weighted Average)

```typescript
function calculateAntiDilutionAdjustment(
  originalPrice: number,
  newPrice: number,
  originalShares: number,
  newShares: number
): AntiDilutionResult {
  // Broad-based weighted average formula
  const weightedAveragePrice =
    (originalPrice * originalShares + newPrice * newShares) /
    (originalShares + newShares);

  const adjustmentRatio = originalPrice / weightedAveragePrice;
  const adjustedShares = originalShares * adjustmentRatio;

  return {
    adjustedPrice: weightedAveragePrice,
    adjustmentRatio,
    adjustedShares,
    additionalShares: adjustedShares - originalShares,
  };
}
```

### 9. Pro-Rata Rights

```typescript
function calculateProRataParticipation(
  currentOwnership: number,
  newRoundSize: number,
  newRoundValuation: number
): ProRataResult {
  const proRataAmount = (currentOwnership / 100) * newRoundSize;
  const proRataPrice =
    newRoundValuation / (totalSharesOutstanding + newSharesIssued);

  return {
    proRataAmount,
    proRataPrice,
    sharesToPurchase: proRataAmount / proRataPrice,
    totalOwnershipAfterProRata:
      ((currentShares + sharesToPurchase) /
        (totalSharesOutstanding + newSharesIssued)) *
      100,
  };
}
```

## Valuation and Net Worth Calculations

### 10. Net Worth Projection

```typescript
function calculateNetWorthProjection(
  ownershipPercentage: number,
  companyValuation: number,
  liquidationPreference: number = 1
): NetWorthProjection {
  const basicNetWorth = (ownershipPercentage / 100) * companyValuation;
  const preferredNetWorth = basicNetWorth * liquidationPreference;

  return {
    basicNetWorth,
    preferredNetWorth,
    ownershipPercentage,
    companyValuation,
  };
}
```

### 11. Unicorn Scenario Modeling

```typescript
function calculateUnicornScenarios(
  currentOwnership: number,
  currentValuation: number,
  projectedDilution: number[]
): UnicornScenarios {
  const scenarios = [1000000000, 5000000000, 10000000000]; // €1B, €5B, €10B

  return scenarios.map((valuation) => {
    const cumulativeDilution = projectedDilution.reduce(
      (acc, dilution) => acc * (1 - dilution / 100),
      1
    );
    const finalOwnership = currentOwnership * cumulativeDilution;

    return {
      valuation,
      ownership: finalOwnership,
      netWorth: (finalOwnership / 100) * valuation,
      multiple: valuation / currentValuation,
    };
  });
}
```

## Round-Specific Standards

### 12. Typical Round Parameters

```typescript
const ROUND_STANDARDS = {
  preSeed: {
    amountRange: [100000, 1000000], // €100K - €1M
    dilutionRange: [5, 15], // 5-15%
    valuationRange: [1000000, 10000000], // €1M - €10M
    instrument: "SAFE",
  },
  seed: {
    amountRange: [1000000, 5000000], // €1M - €5M
    dilutionRange: [10, 20], // 10-20%
    valuationRange: [5000000, 25000000], // €5M - €25M
    instrument: "SAFE",
  },
  seriesA: {
    amountRange: [5000000, 20000000], // €5M - €20M
    dilutionRange: [15, 25], // 15-25%
    valuationRange: [15000000, 100000000], // €15M - €100M
    instrument: "Equity",
  },
  seriesB: {
    amountRange: [15000000, 50000000], // €15M - €50M
    dilutionRange: [10, 20], // 10-20%
    valuationRange: [50000000, 300000000], // €50M - €300M
    instrument: "Equity",
  },
  seriesC: {
    amountRange: [30000000, 100000000], // €30M - €100M
    dilutionRange: [8, 15], // 8-15%
    valuationRange: [200000000, 1000000000], // €200M - €1B
    instrument: "Equity",
  },
};
```

### 13. Option Pool Standards

```typescript
const OPTION_POOL_STANDARDS = {
  preSeed: { min: 5, max: 15, typical: 10 },
  seed: { min: 10, max: 20, typical: 15 },
  seriesA: { min: 15, max: 25, typical: 20 },
  seriesB: { min: 10, max: 15, typical: 12 },
  seriesC: { min: 8, max: 12, typical: 10 },
};
```

### 14. Investor Protection Standards

```typescript
const INVESTOR_PROTECTION_STANDARDS = {
  seriesA: {
    liquidationPreference: 1, // 1x non-participating
    antiDilution: "Weighted Average",
    proRataRights: true,
  },
  seriesB: {
    liquidationPreference: 1, // 1x non-participating
    antiDilution: "Weighted Average",
    proRataRights: true,
  },
  seriesC: {
    liquidationPreference: 1, // 1x non-participating
    antiDilution: "Weighted Average",
    proRataRights: true,
  },
};
```

## Validation Functions

### 15. Round Validation

```typescript
function validateRound(round: FundingRound): ValidationResult {
  const errors: string[] = [];
  const standards = ROUND_STANDARDS[round.type];

  if (
    round.amountRaised < standards.amountRange[0] ||
    round.amountRaised > standards.amountRange[1]
  ) {
    errors.push(`Amount raised outside typical range for ${round.type}`);
  }

  if (
    round.targetDilution < standards.dilutionRange[0] ||
    round.targetDilution > standards.dilutionRange[1]
  ) {
    errors.push(`Dilution outside typical range for ${round.type}`);
  }

  if (
    round.preMoneyValuation < standards.valuationRange[0] ||
    round.preMoneyValuation > standards.valuationRange[1]
  ) {
    errors.push(`Valuation outside typical range for ${round.type}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

### 16. Cap Table Validation

```typescript
function validateCapTable(capTable: CapTable): ValidationResult {
  const totalOwnership =
    capTable.founders +
    capTable.investors +
    capTable.optionPool +
    capTable.advisors;
  const errors: string[] = [];

  if (Math.abs(totalOwnership - 100) > 0.1) {
    errors.push(
      `Total ownership must equal 100% (currently ${totalOwnership.toFixed(
        1
      )}%)`
    );
  }

  if (capTable.founders < 20) {
    errors.push("Founder ownership too low (minimum 20%)");
  }

  if (capTable.optionPool < 5) {
    errors.push("Option pool too small (minimum 5%)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

## Data Types

```typescript
interface FundingRound {
  id: string;
  name: string;
  type: "preSeed" | "seed" | "seriesA" | "seriesB" | "seriesC";
  amountRaised: number;
  preMoneyValuation: number;
  postMoneyValuation: number;
  targetDilution: number;
  optionPoolSize: number;
  advisors: number;
  optionPoolRefresh: "pre-money" | "post-money";
  capTable: CapTable;
  instrument: "SAFE" | "Convertible Note" | "Equity";
  terms?: SAFETerms | NoteTerms | EquityTerms;
}

interface CapTable {
  founders: number;
  investors: number;
  optionPool: number;
  advisors: number;
}

interface SAFETerms {
  valuationCap: number;
  discountRate: number;
  conversionTrigger: "Next Equity Round" | "IPO" | "Acquisition";
  proRataRights: boolean;
}

interface NoteTerms {
  principalAmount: number;
  interestRate: number;
  termMonths: number;
  conversionCap: number;
  discountRate: number;
}

interface EquityTerms {
  liquidationPreference: number;
  antiDilution: "Weighted Average" | "Full Ratchet";
  proRataRights: boolean;
  boardSeats: number;
}
```


