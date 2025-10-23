// Static pricing configuration data
// Preserves exact values from HTML calculator

import {
  TierConfig,
  SecurityClassification,
  PricingModule,
  RegionConfig,
} from "@/app/lib/pricing-types";

export const TIER_CONFIGS: Record<string, TierConfig> = {
  team: {
    id: "team",
    name: "Team (Tactical/Edge)",
    pricing: { min: 200000, max: 500000 },
    quotas: { data: 2, ai: 1 },
    recommendations: {
      cores: 32,
      classification: "restricted",
      dataUsage: 2,
      aiRuns: 1,
    },
  },
  unit: {
    id: "unit",
    name: "Unit (Mission Center)",
    pricing: { min: 600000, max: 1200000 },
    quotas: { data: 5, ai: 5 },
    recommendations: {
      cores: 128,
      classification: "restricted",
      dataUsage: 5,
      aiRuns: 5,
    },
  },
  command: {
    id: "command",
    name: "Command (HQ)",
    pricing: { min: 1500000, max: 3000000 },
    quotas: { data: 15, ai: 20 },
    recommendations: {
      cores: 256,
      classification: "airgapped",
      dataUsage: 15,
      aiRuns: 20,
    },
  },
  national: {
    id: "national",
    name: "National/Coalition",
    pricing: { min: 3500000, max: 6000000 },
    quotas: { data: 50, ai: 50 },
    recommendations: {
      cores: 512,
      classification: "airgapped",
      dataUsage: 50,
      aiRuns: 50,
    },
  },
};

export const SECURITY_CLASSIFICATIONS: Record<string, SecurityClassification> =
  {
    unclassified: {
      id: "unclassified",
      name: "Cloud - Unclassified",
      setupRate: 0.15,
      corePricing: { min: 2000, max: 3000 },
      dataOverageRates: { min: 80, max: 120 },
      aiRates: { min: 10, max: 20 },
    },
    restricted: {
      id: "restricted",
      name: "Hybrid - Sovereign/Secure Cloud",
      setupRate: 0.25,
      corePricing: { min: 3000, max: 4000 },
      dataOverageRates: { min: 150, max: 200 },
      aiRates: { min: 30, max: 40 },
    },
    airgapped: {
      id: "airgapped",
      name: "Air-gapped - Confidential/Secret",
      setupRate: 0.4,
      corePricing: { min: 4000, max: 5000 },
      dataOverageRates: { min: 200, max: 250 },
      aiRates: { min: 40, max: 50 },
    },
    topsecret: {
      id: "topsecret",
      name: "Custom - Top Secret/Multi-agency",
      setupRate: 0.5,
      corePricing: { min: 4000, max: 5000 },
      dataOverageRates: { min: 200, max: 250 },
      aiRates: { min: 40, max: 50 },
    },
  };

export const PRICING_MODULES: PricingModule[] = [
  {
    id: "praevis",
    name: "Praevis (Mission Planning)",
    multiplier: 1.0,
    selected: false,
  },
  {
    id: "pensa",
    name: "Pensa (Intel/OSINT)",
    multiplier: 1.0,
    selected: false,
  },
  {
    id: "procura",
    name: "Procura (Logistics)",
    multiplier: 0.8,
    selected: false,
  },
  {
    id: "praetorium",
    name: "Praetorium (Command & Control)",
    multiplier: 0.9,
    selected: false,
  },
  {
    id: "parabellum",
    name: "Parabellum (VR Training)",
    multiplier: 0.8,
    selected: false,
  },
];

export const REGIONS: RegionConfig[] = [
  { name: "Netherlands", vatRate: 21, currency: "EUR" },
  { name: "Germany", vatRate: 19, currency: "EUR" },
  { name: "France", vatRate: 20, currency: "EUR" },
  { name: "United Kingdom", vatRate: 20, currency: "GBP" },
  { name: "Belgium", vatRate: 21, currency: "EUR" },
  { name: "Denmark", vatRate: 25, currency: "EUR" },
  { name: "Sweden", vatRate: 25, currency: "EUR" },
  { name: "Norway", vatRate: 25, currency: "EUR" },
  { name: "Finland", vatRate: 24, currency: "EUR" },
  { name: "Poland", vatRate: 23, currency: "EUR" },
  { name: "Italy", vatRate: 22, currency: "EUR" },
  { name: "Spain", vatRate: 21, currency: "EUR" },
  { name: "Austria", vatRate: 20, currency: "EUR" },
  { name: "Switzerland", vatRate: 7.7, currency: "EUR" },
];

export const CURRENCY_RATES = {
  EUR: 1,
  USD: 1.1,
  GBP: 0.85,
};

export const CURRENCY_SYMBOLS = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

// Pricing position multipliers
export const PRICING_POSITION_MULTIPLIERS = {
  low: 0,
  mid: 0.5,
  high: 1,
};

// Support and maintenance rate
export const SUPPORT_RATE = 0.2;

// Multi-year discount rates
export const AUTO_DISCOUNT_RATES = {
  threeYear: 0.1, // 36+ months
  fiveYear: 0.15, // 60+ months
};

// NATO/MOD detection keywords
export const NATO_KEYWORDS = [
  "nato",
  "ministry",
  "defence",
  "defense",
  "military",
  "army",
  "navy",
  "air force",
  "mod",
  "dod",
  "bundeswehr",
  "ministerie",
  "defensie",
  "försvarsmakten",
  "forsvaret",
  "puolustusvoimat",
  "siły zbrojne",
  "esercito",
  "ejército",
];
