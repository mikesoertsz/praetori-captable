"use client";

import { useEffect, useState } from "react";
import { useFundingStore } from "@/app/store/fundingStore";
import { FundingData } from "@/app/lib/types";
import InputPanel from "./components/input/InputPanel";
import RoundVisualization from "./components/visualization/RoundVisualization";
import fundingData from "@/app/data/fundingRounds.json";

export default function Home() {
  const { data, recalculateAllRounds } = useFundingStore();
  const [showFounderNetWorth, setShowFounderNetWorth] = useState(false);

  // Initialize store with data from JSON file
  useEffect(() => {
    useFundingStore.setState({ data: fundingData as FundingData });
    recalculateAllRounds();
  }, [recalculateAllRounds]);

  // Don't render until data is loaded
  if (!data || !data.rounds || data.rounds.length === 0) {
    return (
      <div className="w-full h-screen bg-gradient-to-r from-slate-100 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-700">Loading...</div>
          <div className="text-sm text-gray-500 mt-2">
            Initializing funding data
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-slate-100 to-white">
      <div className="h-screen flex">
        {/* Left Column - Input Panel */}
        <div className="w-full max-w-[600px] border-r border-gray-200 overflow-y-auto scrollbar-hide">
          <InputPanel
            showFounderNetWorth={showFounderNetWorth}
            setShowFounderNetWorth={setShowFounderNetWorth}
          />
        </div>

        {/* Middle Column - Round Visualization */}
        <div className="flex-1 bg-slate-100 overflow-y-auto scrollbar-hide">
          <RoundVisualization showFounderNetWorth={showFounderNetWorth} />
        </div>
      </div>
    </div>
  );
}
