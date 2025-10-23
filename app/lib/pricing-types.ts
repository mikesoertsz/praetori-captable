// Pricing Calculator Type Definitions
// Preserves exact functionality from HTML calculator

export interface ClientInfo {
  name: string;
  primaryContact: string;
  opportunityName: string;
  region: string;
  customVat?: number;
  projectDescription: string;
}

export interface LicenseConfig {
  tier: "team" | "unit" | "command" | "national" | "";
  modules: PricingModule[];
  pricingPosition: "low" | "mid" | "high" | "";
}

export interface PricingModule {
  id: "praevis" | "pensa" | "procura" | "praetorium" | "parabellum";
  name: string;
  multiplier: number;
  selected: boolean;
}

export interface InfrastructureConfig {
  cores: number;
  customCores?: number;
  classification:
    | "unclassified"
    | "restricted"
    | "airgapped"
    | "topsecret"
    | "";
  dataUsage: number;
  customData?: number;
  aiRuns: number;
  customAi?: number;
}

export interface ContractTerms {
  duration: number;
  customDuration?: number;
  startDate: string;
  validUntil: string;
  paymentTerms:
    | "Annual Advance"
    | "Quarterly"
    | "Monthly"
    | "Milestone-based"
    | "";
  renewalOption: "Automatic" | "Manual" | "Option" | "None" | "";
  currency: "EUR" | "USD" | "GBP";
  enableAutoDiscount: boolean;
  additionalDiscount: number;
  customDiscount?: number;
}

export interface PricingResult {
  year1Cost: number;
  annualCost: number;
  tcv: number;
  aav: number;
  breakdown: PricingBreakdown[];
}

export interface PricingBreakdown {
  component: string;
  description: string;
  cost: number;
}

export interface VATConfig {
  rate: number;
  region: string;
  showInclusive: boolean;
  year1Amount: number;
  annualAmount: number;
  totalAmount: number;
}

export interface DiscountConfig {
  autoDiscountRate: number;
  additionalDiscountRate: number;
  totalDiscountRate: number;
  enableAutoDiscount: boolean;
}

export interface SecurityClassification {
  id: string;
  name: string;
  setupRate: number;
  corePricing: {
    min: number;
    max: number;
  };
  dataOverageRates: {
    min: number;
    max: number;
  };
  aiRates: {
    min: number;
    max: number;
  };
}

export interface TierConfig {
  id: string;
  name: string;
  pricing: {
    min: number;
    max: number;
  };
  quotas: {
    data: number; // TB
    ai: number; // Million tokens
  };
  recommendations: {
    cores: number;
    classification: string;
    dataUsage: number;
    aiRuns: number;
  };
}

export interface RegionConfig {
  name: string;
  vatRate: number;
  currency: string;
}

export interface PricingFormData {
  client: ClientInfo;
  license: LicenseConfig;
  infrastructure: InfrastructureConfig;
  contract: ContractTerms;
}

export interface PricingState {
  formData: PricingFormData;
  result: PricingResult | null;
  vat: VATConfig;
  discount: DiscountConfig;
  isLoading: boolean;
  errors: Record<string, string>;
}

// Form validation types
export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

// PDF generation types
export interface PDFData {
  client: ClientInfo;
  configuration: LicenseConfig & InfrastructureConfig;
  contract: ContractTerms;
  pricing: PricingResult;
  vat: VATConfig;
  discount: DiscountConfig;
  generatedAt: string;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "error" | "info";
  duration?: number;
}

// Tooltip types
export interface TooltipContent {
  title: string;
  description: string;
  pricingInfo?: string;
  examples?: string;
}

// Custom field visibility
export interface CustomFieldState {
  customVat: boolean;
  customCores: boolean;
  customData: boolean;
  customAi: boolean;
  customDuration: boolean;
  customDiscount: boolean;
}
