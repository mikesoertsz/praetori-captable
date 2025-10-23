// Form options and dropdown data
// Preserves exact options from HTML calculator

export const TIER_OPTIONS = [
  { value: "", label: "Select License Tier" },
  { value: "team", label: "Team (Tactical/Edge)" },
  { value: "unit", label: "Unit (Mission Center)" },
  { value: "command", label: "Command (HQ)" },
  { value: "national", label: "National/Coalition" },
];

export const PRICING_POSITION_OPTIONS = [
  { value: "", label: "Select Pricing Position" },
  { value: "low", label: "Low (Competitive)" },
  { value: "mid", label: "Mid (Standard)" },
  { value: "high", label: "High (Premium)" },
];

export const CORE_OPTIONS = [
  { value: "", label: "Select CPU Cores" },
  { value: "16", label: "16 cores" },
  { value: "32", label: "32 cores" },
  { value: "64", label: "64 cores" },
  { value: "128", label: "128 cores" },
  { value: "256", label: "256 cores" },
  { value: "512", label: "512 cores" },
  { value: "1024", label: "1024 cores" },
  { value: "custom", label: "Custom" },
];

export const SECURITY_CLASSIFICATION_OPTIONS = [
  { value: "", label: "Select Security Classification" },
  { value: "unclassified", label: "Cloud - Unclassified (15% setup)" },
  { value: "restricted", label: "Hybrid - Sovereign/Secure Cloud (25% setup)" },
  { value: "airgapped", label: "Air-gapped - Confidential/Secret (40% setup)" },
  {
    value: "topsecret",
    label: "Custom - Top Secret/Multi-agency (50%+ setup)",
  },
];

export const DATA_USAGE_OPTIONS = [
  { value: "", label: "Select Data Usage" },
  { value: "1", label: "1 TB/month" },
  { value: "2", label: "2 TB/month" },
  { value: "5", label: "5 TB/month" },
  { value: "10", label: "10 TB/month" },
  { value: "15", label: "15 TB/month" },
  { value: "25", label: "25 TB/month" },
  { value: "50", label: "50 TB/month" },
  { value: "100", label: "100 TB/month" },
  { value: "custom", label: "Custom" },
];

export const AI_USAGE_OPTIONS = [
  { value: "", label: "Select Token Usage" },
  { value: "0.5", label: "0.5M tokens/month" },
  { value: "1", label: "1M tokens/month" },
  { value: "5", label: "5M tokens/month" },
  { value: "10", label: "10M tokens/month" },
  { value: "20", label: "20M tokens/month" },
  { value: "50", label: "50M tokens/month" },
  { value: "100", label: "100M tokens/month" },
  { value: "custom", label: "Custom" },
];

export const CONTRACT_DURATION_OPTIONS = [
  { value: "", label: "Select Duration" },
  { value: "12", label: "12 months" },
  { value: "18", label: "18 months" },
  { value: "24", label: "24 months" },
  { value: "36", label: "36 months" },
  { value: "48", label: "48 months" },
  { value: "60", label: "60 months" },
  { value: "custom", label: "Custom" },
];

export const PAYMENT_TERMS_OPTIONS = [
  { value: "", label: "Select Payment Terms" },
  { value: "Annual Advance", label: "Annual Advance" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Milestone-based", label: "Milestone-based" },
];

export const RENEWAL_OPTIONS = [
  { value: "", label: "Select Renewal Option" },
  { value: "Automatic", label: "Automatic (90-day notice)" },
  { value: "Manual", label: "Manual Renewal" },
  { value: "Option", label: "Client Option" },
  { value: "None", label: "No Renewal" },
];

export const CURRENCY_OPTIONS = [
  { value: "EUR", label: "EUR (Euro)" },
  { value: "USD", label: "USD (US Dollar)" },
  { value: "GBP", label: "GBP (British Pound)" },
];

export const REGION_OPTIONS = [
  { value: "", label: "Select Region" },
  { value: "Netherlands", label: "Netherlands (21% VAT)" },
  { value: "Germany", label: "Germany (19% VAT)" },
  { value: "France", label: "France (20% VAT)" },
  { value: "United Kingdom", label: "United Kingdom (20% VAT)" },
  { value: "Belgium", label: "Belgium (21% VAT)" },
  { value: "Denmark", label: "Denmark (25% VAT)" },
  { value: "Sweden", label: "Sweden (25% VAT)" },
  { value: "Norway", label: "Norway (25% VAT)" },
  { value: "Finland", label: "Finland (24% VAT)" },
  { value: "Poland", label: "Poland (23% VAT)" },
  { value: "Italy", label: "Italy (22% VAT)" },
  { value: "Spain", label: "Spain (21% VAT)" },
  { value: "Austria", label: "Austria (20% VAT)" },
  { value: "Switzerland", label: "Switzerland (7.7% VAT)" },
  { value: "custom", label: "Custom VAT Rate" },
];

export const ADDITIONAL_DISCOUNT_OPTIONS = [
  { value: "0", label: "No Additional Discount" },
  { value: "5", label: "5% - Volume/Partnership" },
  { value: "10", label: "10% - Strategic Account" },
  { value: "15", label: "15% - Competitive Response" },
  { value: "20", label: "20% - Major Commitment" },
  { value: "25", label: "25% - Strategic Partnership" },
  { value: "custom", label: "Custom Discount" },
];
