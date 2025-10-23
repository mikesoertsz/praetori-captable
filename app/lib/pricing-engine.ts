// Pricing calculation engine
// Preserves exact calculation logic from HTML calculator

import {
  PricingFormData,
  PricingResult,
  PricingBreakdown,
  VATConfig,
  DiscountConfig,
} from "@/app/lib/pricing-types";
import {
  TIER_CONFIGS,
  SECURITY_CLASSIFICATIONS,
  PRICING_MODULES,
  REGIONS,
  CURRENCY_RATES,
  CURRENCY_SYMBOLS,
  PRICING_POSITION_MULTIPLIERS,
  SUPPORT_RATE,
  AUTO_DISCOUNT_RATES,
  NATO_KEYWORDS,
} from "@/app/data/pricing-config";

// European number formatting (preserves exact HTML logic)
export function formatEuropean(amount: number): string {
  return Math.round(amount).toLocaleString("de-DE") + ",-";
}

// VAT rate calculation (preserves exact HTML logic)
export function getVATRate(region: string, customVat?: number): number {
  if (region === "custom") return customVat || 0;

  const regionConfig = REGIONS.find((r) => r.name === region);
  return regionConfig?.vatRate || 0;
}

// NATO/MOD client detection (preserves exact HTML logic)
export function detectNATOMOD(clientName: string): boolean {
  return NATO_KEYWORDS.some((keyword) =>
    clientName.toLowerCase().includes(keyword)
  );
}

// Main pricing calculation (preserves exact HTML logic)
export function calculatePricing(formData: PricingFormData): PricingResult {
  const { client, license, infrastructure, contract } = formData;

  // Validate required fields
  if (
    !license.tier ||
    !license.pricingPosition ||
    !infrastructure.classification ||
    license.modules.filter((m) => m.selected).length === 0
  ) {
    throw new Error("Required fields missing for calculation");
  }

  // Get tier configuration
  const tierConfig = TIER_CONFIGS[license.tier];
  if (!tierConfig) throw new Error("Invalid tier configuration");

  // Get security classification
  const securityConfig =
    SECURITY_CLASSIFICATIONS[infrastructure.classification];
  if (!securityConfig) throw new Error("Invalid security classification");

  // Get selected modules
  const selectedModules = license.modules.filter((m) => m.selected);

  // Pricing position multiplier
  const positionMultiplier =
    PRICING_POSITION_MULTIPLIERS[license.pricingPosition];

  // Base license calculation
  const baseRange = tierConfig.pricing;
  const basePrice =
    baseRange.min + (baseRange.max - baseRange.min) * positionMultiplier;

  let baseLicense = 0;
  selectedModules.forEach((module) => {
    baseLicense += basePrice * module.multiplier;
  });

  // Elastic compute pricing
  const coreRange = securityConfig.corePricing;
  const corePrice =
    coreRange.min + (coreRange.max - coreRange.min) * positionMultiplier;
  const elasticCompute = infrastructure.cores * corePrice;

  // Data usage fees
  const quota = tierConfig.quotas.data;
  const overage = Math.max(0, infrastructure.dataUsage - quota);

  const dataRange = securityConfig.dataOverageRates;
  const dataRate =
    dataRange.min + (dataRange.max - dataRange.min) * positionMultiplier;
  const dataFees = overage * dataRate * 12; // Annual

  // AI token fees (values in millions of tokens)
  const aiQuota = tierConfig.quotas.ai;
  const aiOverage = Math.max(0, infrastructure.aiRuns - aiQuota);

  const aiRange = securityConfig.aiRates;
  const aiRate = aiRange.min + (aiRange.max - aiRange.min) * positionMultiplier;
  const aiFees = aiOverage * aiRate * 12; // Annual

  // Support & maintenance (20% of license + cores)
  const supportFees = (baseLicense + elasticCompute) * SUPPORT_RATE;

  // Setup fee based on deployment type
  let setupRate = securityConfig.setupRate;
  const deploymentType = securityConfig.name;

  // For top secret, add position multiplier to setup rate
  if (infrastructure.classification === "topsecret") {
    setupRate = 0.5 + 0.1 * positionMultiplier;
  }

  const setupFee = baseLicense * setupRate;

  // Calculate discounts
  const discountConfig = calculateDiscounts(contract);
  const totalDiscountRate = Math.min(0.5, discountConfig.totalDiscountRate);

  // Annual costs (after discounts)
  const annualLicense = baseLicense * (1 - totalDiscountRate);
  const annualCompute = elasticCompute * (1 - totalDiscountRate);
  const annualData = dataFees * (1 - totalDiscountRate);
  const annualAI = aiFees * (1 - totalDiscountRate);
  const annualSupport = supportFees * (1 - totalDiscountRate);

  const annualCost =
    annualLicense + annualCompute + annualData + annualAI + annualSupport;
  const year1Cost = annualCost + setupFee;
  const tcv = year1Cost + annualCost * (contract.duration / 12 - 1);
  const aav = tcv / (contract.duration / 12);

  // Breakdown for display
  const breakdown: PricingBreakdown[] = [
    {
      component: "Base License",
      description: `${selectedModules.length} modules (${selectedModules
        .map((m) => m.name.split(" ")[0])
        .join(", ")})`,
      cost: annualLicense,
    },
    {
      component: "Elastic Compute",
      description: `${infrastructure.cores} cores (${infrastructure.classification})`,
      cost: annualCompute,
    },
    {
      component: "Data Usage",
      description: `${infrastructure.dataUsage}TB/month (${overage.toFixed(
        1
      )}TB overage)`,
      cost: annualData,
    },
    {
      component: "AI Token Usage",
      description: `${infrastructure.aiRuns}M tokens/month (${aiOverage.toFixed(
        1
      )}M overage)`,
      cost: annualAI,
    },
    {
      component: "Support & Maintenance",
      description: `${SUPPORT_RATE * 100}% of license + compute`,
      cost: annualSupport,
    },
    {
      component: "Setup Fee (Year 1 only)",
      description: `${(setupRate * 100).toFixed(1)}% - ${deploymentType}`,
      cost: setupFee,
    },
  ];

  return {
    year1Cost,
    annualCost,
    tcv,
    aav,
    breakdown,
  };
}

// Calculate discount configuration (preserves exact HTML logic)
export function calculateDiscounts(contract: any): DiscountConfig {
  let autoDiscountRate = 0;

  if (contract.enableAutoDiscount) {
    if (contract.duration >= 60) {
      autoDiscountRate = AUTO_DISCOUNT_RATES.fiveYear; // 5+ years
    } else if (contract.duration >= 36) {
      autoDiscountRate = AUTO_DISCOUNT_RATES.threeYear; // 3+ years
    }
  }

  const additionalDiscountRate = contract.additionalDiscount / 100;
  const totalDiscountRate = Math.min(
    0.5,
    autoDiscountRate + additionalDiscountRate
  );

  return {
    autoDiscountRate,
    additionalDiscountRate,
    totalDiscountRate,
    enableAutoDiscount: contract.enableAutoDiscount,
  };
}

// Calculate VAT configuration
export function calculateVAT(
  year1Cost: number,
  annualCost: number,
  tcv: number,
  region: string,
  customVat?: number,
  showInclusive: boolean = false
): VATConfig {
  const rate = getVATRate(region, customVat);

  return {
    rate,
    region,
    showInclusive,
    year1Amount: (year1Cost * rate) / 100,
    annualAmount: (annualCost * rate) / 100,
    totalAmount: (tcv * rate) / 100,
  };
}

// Apply currency conversion
export function applyCurrencyConversion(
  amount: number,
  currency: "EUR" | "USD" | "GBP"
): number {
  const rate = CURRENCY_RATES[currency];
  return amount * rate;
}

// Get currency symbol
export function getCurrencySymbol(currency: "EUR" | "USD" | "GBP"): string {
  return CURRENCY_SYMBOLS[currency];
}

// Format amount with currency
export function formatAmount(
  amount: number,
  currency: "EUR" | "USD" | "GBP",
  showVatInclusive: boolean = false,
  vatRate: number = 0
): string {
  const symbol = getCurrencySymbol(currency);
  const vatMultiplier = showVatInclusive ? 1 + vatRate / 100 : 1;
  const convertedAmount = applyCurrencyConversion(amount, currency);
  const finalAmount = convertedAmount * vatMultiplier;

  return `${symbol} ${formatEuropean(finalAmount)}`;
}

// Auto-fill recommendations based on tier
export function getTierRecommendations(tier: string) {
  const tierConfig = TIER_CONFIGS[tier];
  if (!tierConfig) return null;

  return tierConfig.recommendations;
}

// Validate form data
export function validateFormData(formData: PricingFormData): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Required client fields
  if (!formData.client.name.trim()) {
    errors.clientName = "Client organization is required";
  }

  // Required license fields
  if (!formData.license.tier) {
    errors.tier = "License tier is required";
  }

  if (formData.license.modules.filter((m) => m.selected).length === 0) {
    errors.modules = "At least one AI module must be selected";
  }

  if (!formData.license.pricingPosition) {
    errors.pricingPosition = "Pricing position is required";
  }

  // Required infrastructure fields
  if (!formData.infrastructure.classification) {
    errors.classification = "Security classification is required";
  }

  if (formData.infrastructure.cores <= 0) {
    errors.cores = "CPU cores must be greater than 0";
  }

  // Required contract fields
  if (formData.contract.duration <= 0) {
    errors.duration = "Contract duration must be greater than 0";
  }

  if (!formData.contract.paymentTerms) {
    errors.paymentTerms = "Payment terms are required";
  }

  if (!formData.contract.renewalOption) {
    errors.renewalOption = "Renewal option is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
