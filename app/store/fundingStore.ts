import { create } from "zustand";
import { FundingData, FundingRound, CapTable } from "@/app/lib/types";
import { calculateRoundMetrics } from "@/app/lib/calculationEngine";

interface FundingStore {
  data: FundingData;
  selectedRoundId: string;

  // Actions
  updateRound: (
    roundId: string,
    field: keyof FundingRound,
    value: string | number | Record<string, unknown>
  ) => void;
  setSelectedRound: (roundId: string) => void;
  updateCapTable: (roundId: string, capTable: CapTable) => void;
  recalculateAllRounds: () => void;
}

// Helper function to ensure cap table percentages never exceed 100%
function normalizeCapTable(capTable: CapTable): CapTable {
  const total =
    capTable.founders +
    capTable.investors +
    capTable.optionPool +
    capTable.advisors;

  if (total > 100) {
    // Scale down proportionally to ensure total = 100%
    const scaleFactor = 100 / total;
    return {
      founders: Math.round(capTable.founders * scaleFactor * 10) / 10,
      investors: Math.round(capTable.investors * scaleFactor * 10) / 10,
      optionPool: Math.round(capTable.optionPool * scaleFactor * 10) / 10,
      advisors: Math.round(capTable.advisors * scaleFactor * 10) / 10,
    };
  }

  return capTable;
}

// Helper function to calculate pre-money valuation from amount raised and percentage sold
function calculatePreMoneyFromPercentage(
  amountRaised: number,
  percentageSold: number
): number {
  if (percentageSold <= 0) return 0;
  return (amountRaised * (100 - percentageSold)) / percentageSold;
}

// Helper function to calculate percentage sold from amount raised and pre-money valuation
function calculatePercentageFromPreMoney(
  amountRaised: number,
  preMoneyValuation: number
): number {
  if (preMoneyValuation <= 0) return 0;
  return (amountRaised / (preMoneyValuation + amountRaised)) * 100;
}

export const useFundingStore = create<FundingStore>((set, get) => ({
  data: {
    company: {
      name: "",
      founded: "",
    },
    rounds: [],
    founders: {},
    optionPool: {
      currentSize: 0,
      refreshStrategy: "post-money",
    },
    advisors: {
      totalAllocation: 0,
    },
  },
  selectedRoundId: "seed",

  updateRound: (
    roundId: string,
    field: keyof FundingRound,
    value: string | number | Record<string, unknown>
  ) => {
    set((state) => {
      const updatedRounds = state.data.rounds.map((round) => {
        if (round.id !== roundId) return round;

        let updatedRound = { ...round };

        // Handle different field types
        if (
          field === "capTable" &&
          typeof value === "object" &&
          value !== null
        ) {
          const normalizedCapTable = normalizeCapTable(
            value as unknown as CapTable
          );
          updatedRound = { ...updatedRound, capTable: normalizedCapTable };
        } else if (field === "amountRaised" && typeof value === "number") {
          // When amount raised changes, recalculate pre-money valuation
          const percentageSold = updatedRound.capTable.investors;
          const newPreMoney = calculatePreMoneyFromPercentage(
            value,
            percentageSold
          );
          updatedRound = {
            ...updatedRound,
            amountRaised: value,
            preMoneyValuation: Math.round(newPreMoney),
          };
        } else if (field === "preMoneyValuation" && typeof value === "number") {
          // When pre-money valuation changes, recalculate percentage sold
          const newPercentage = calculatePercentageFromPreMoney(
            updatedRound.amountRaised,
            value
          );
          const normalizedCapTable = normalizeCapTable({
            ...updatedRound.capTable,
            investors: newPercentage,
          });
          updatedRound = {
            ...updatedRound,
            preMoneyValuation: value,
            capTable: normalizedCapTable,
          };
        } else {
          // Direct field update
          updatedRound = { ...updatedRound, [field]: value };
        }

        // Recalculate all metrics for this round
        return calculateRoundMetrics(updatedRound);
      });

      // Recalculate all subsequent rounds to maintain consistency
      const recalculatedRounds = updatedRounds.map((round, index) => {
        if (index === 0) return round;

        // Recalculate based on previous round's post-money valuation
        const previousRound = updatedRounds[index - 1];
        return calculateRoundMetrics(round, previousRound);
      });

      return {
        data: {
          ...state.data,
          rounds: recalculatedRounds,
        },
      };
    });
  },

  setSelectedRound: (roundId: string) => {
    set({ selectedRoundId: roundId });
  },

  updateCapTable: (roundId: string, capTable: CapTable) => {
    const normalizedCapTable = normalizeCapTable(capTable);
    get().updateRound(
      roundId,
      "capTable",
      normalizedCapTable as unknown as Record<string, unknown>
    );
  },

  recalculateAllRounds: () => {
    set((state) => {
      const recalculatedRounds = state.data.rounds.map((round, index) => {
        if (index === 0) return calculateRoundMetrics(round);

        const previousRound = state.data.rounds[index - 1];
        return calculateRoundMetrics(round, previousRound);
      });

      return {
        data: {
          ...state.data,
          rounds: recalculatedRounds,
        },
      };
    });
  },
}));
