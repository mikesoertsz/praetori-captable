// Pricing calculator state management hook
// Manages form state, calculations, and UI interactions

import { useState, useCallback, useEffect } from "react";
import {
  PricingFormData,
  PricingState,
  PricingResult,
  VATConfig,
  DiscountConfig,
  CustomFieldState,
  Notification,
} from "@/app/lib/pricing-types";
import { PRICING_MODULES, TIER_CONFIGS } from "@/app/data/pricing-config";
import {
  calculatePricing,
  calculateVAT,
  calculateDiscounts,
  validateFormData,
  getTierRecommendations,
} from "@/app/lib/pricing-engine";

// Initial form data
const initialFormData: PricingFormData = {
  client: {
    name: "",
    primaryContact: "",
    opportunityName: "",
    region: "",
    projectDescription: "",
  },
  license: {
    tier: "",
    modules: PRICING_MODULES.map((module) => ({ ...module, selected: false })),
    pricingPosition: "",
  },
  infrastructure: {
    cores: 0,
    classification: "",
    dataUsage: 0,
    aiRuns: 0,
  },
  contract: {
    duration: 12,
    startDate: new Date().toISOString().split("T")[0],
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paymentTerms: "",
    renewalOption: "",
    currency: "EUR",
    enableAutoDiscount: true,
    additionalDiscount: 0,
  },
};

export function usePricingCalculator() {
  const [state, setState] = useState<PricingState>({
    formData: initialFormData,
    result: null,
    vat: {
      rate: 0,
      region: "",
      showInclusive: false,
      year1Amount: 0,
      annualAmount: 0,
      totalAmount: 0,
    },
    discount: {
      autoDiscountRate: 0,
      additionalDiscountRate: 0,
      totalDiscountRate: 0,
      enableAutoDiscount: true,
    },
    isLoading: false,
    errors: {},
  });

  const [customFields, setCustomFields] = useState<CustomFieldState>({
    customVat: false,
    customCores: false,
    customData: false,
    customAi: false,
    customDuration: false,
    customDiscount: false,
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Update form data
  const updateFormData = useCallback((updates: Partial<PricingFormData>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, ...updates },
    }));
  }, []);

  // Update client information
  const updateClient = useCallback(
    (updates: Partial<PricingFormData["client"]>) => {
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          client: { ...prev.formData.client, ...updates },
        },
      }));
    },
    []
  );

  // Update license configuration
  const updateLicense = useCallback(
    (updates: Partial<PricingFormData["license"]>) => {
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          license: { ...prev.formData.license, ...updates },
        },
      }));
    },
    []
  );

  // Update infrastructure configuration
  const updateInfrastructure = useCallback(
    (updates: Partial<PricingFormData["infrastructure"]>) => {
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          infrastructure: { ...prev.formData.infrastructure, ...updates },
        },
      }));
    },
    []
  );

  // Update contract terms
  const updateContract = useCallback(
    (updates: Partial<PricingFormData["contract"]>) => {
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          contract: { ...prev.formData.contract, ...updates },
        },
      }));
    },
    []
  );

  // Toggle module selection
  const toggleModule = useCallback((moduleId: string) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        license: {
          ...prev.formData.license,
          modules: prev.formData.license.modules.map((module) =>
            module.id === moduleId
              ? { ...module, selected: !module.selected }
              : module
          ),
        },
      },
    }));
  }, []);

  // Toggle VAT inclusive/exclusive
  const toggleVATInclusive = useCallback(() => {
    setState((prev) => ({
      ...prev,
      vat: { ...prev.vat, showInclusive: !prev.vat.showInclusive },
    }));
  }, []);

  // Toggle auto discount
  const toggleAutoDiscount = useCallback(() => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        contract: {
          ...prev.formData.contract,
          enableAutoDiscount: !prev.formData.contract.enableAutoDiscount,
        },
      },
    }));
  }, []);

  // Show/hide custom fields
  const toggleCustomField = useCallback((field: keyof CustomFieldState) => {
    setCustomFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  // Auto-fill based on tier selection
  const autoFillTierRecommendations = useCallback(
    (tier: string) => {
      const recommendations = getTierRecommendations(tier);
      if (!recommendations) return;

      updateInfrastructure({
        cores: recommendations.cores,
        classification: recommendations.classification as
          | "unclassified"
          | "restricted"
          | "airgapped"
          | "topsecret",
        dataUsage: recommendations.dataUsage,
        aiRuns: recommendations.aiRuns,
      });

      // Show notification
      addNotification({
        title: "Configuration Auto-Filled",
        message: `Auto-filled: ${recommendations.cores} cores, ${recommendations.classification} security, ${recommendations.dataUsage}TB data, ${recommendations.aiRuns}M tokens`,
        type: "info",
      });
    },
    [updateInfrastructure]
  );

  // Add notification
  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
      };

      setNotifications((prev) => [...prev, newNotification]);

      // Auto-remove after 10 seconds
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.id !== newNotification.id)
        );
      }, 10000);
    },
    []
  );

  // Remove notification
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Calculate pricing
  const calculate = useCallback(() => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      // Validate form data
      const validation = validateFormData(state.formData);
      if (!validation.isValid) {
        setState((prev) => ({
          ...prev,
          errors: validation.errors,
          isLoading: false,
        }));
        return;
      }

      // Calculate pricing
      const result = calculatePricing(state.formData);

      // Calculate VAT
      const vat = calculateVAT(
        result.year1Cost,
        result.annualCost,
        result.tcv,
        state.formData.client.region,
        state.formData.client.customVat,
        state.vat.showInclusive
      );

      // Calculate discounts
      const discount = calculateDiscounts(state.formData.contract);

      setState((prev) => ({
        ...prev,
        result,
        vat,
        discount,
        errors: {},
        isLoading: false,
      }));
    } catch (error) {
      console.error("Pricing calculation error:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        errors: { general: "Calculation error. Please check your inputs." },
      }));

      addNotification({
        title: "Calculation Error",
        message: "Please check your inputs and try again.",
        type: "warning",
      });
    }
  }, [state.formData, state.vat.showInclusive, addNotification]);

  // Auto-calculate when form data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculate();
    }, 300); // Debounce calculation

    return () => clearTimeout(timeoutId);
  }, [calculate]);

  // Auto-fill when tier changes
  useEffect(() => {
    if (state.formData.license.tier) {
      autoFillTierRecommendations(state.formData.license.tier);
    }
  }, [state.formData.license.tier, autoFillTierRecommendations]);

  // Update custom field visibility based on form values
  useEffect(() => {
    setCustomFields((prev) => ({
      ...prev,
      customVat: state.formData.client.region === "custom",
      customCores:
        state.formData.infrastructure.cores === 0 &&
        state.formData.license.tier !== "",
      customData:
        state.formData.infrastructure.dataUsage === 0 &&
        state.formData.license.tier !== "",
      customAi:
        state.formData.infrastructure.aiRuns === 0 &&
        state.formData.license.tier !== "",
      customDuration:
        state.formData.contract.duration === 12 &&
        state.formData.license.tier !== "",
      customDiscount:
        state.formData.contract.additionalDiscount === 0 &&
        state.formData.license.tier !== "",
    }));
  }, [state.formData]);

  return {
    // State
    formData: state.formData,
    result: state.result,
    vat: state.vat,
    discount: state.discount,
    isLoading: state.isLoading,
    errors: state.errors,
    customFields,
    notifications,

    // Actions
    updateClient,
    updateLicense,
    updateInfrastructure,
    updateContract,
    toggleModule,
    toggleVATInclusive,
    toggleAutoDiscount,
    toggleCustomField,
    calculate,
    addNotification,
    removeNotification,
  };
}
