"use client";

import { useEffect } from "react";
import { useFundingStore } from "@/app/store/fundingStore";
import { FundingData } from "@/app/lib/types";
import InputPanel from "./components/input/InputPanel";
import RoundVisualization from "./components/visualization/RoundVisualization";
import FundraisingTimeline from "./components/visualization/FundraisingTimeline";
import fundingData from "@/app/data/fundingRounds.json";

export default function Home() {
  const { recalculateAllRounds } = useFundingStore();

  // Initialize store with data from JSON file
  useEffect(() => {
    useFundingStore.setState({ data: fundingData as FundingData });
    recalculateAllRounds();
  }, [recalculateAllRounds]);

  return (
    <div className="w-full h-screen bg-gradient-to-r from-slate-100 to-white">
      <div className="h-screen flex">
        {/* Left Column - Input Panel */}
        <div className="w-full max-w-[600px] border-r border-gray-200 overflow-y-auto scrollbar-hide">
          <InputPanel />
        </div>

        {/* Middle Column - Round Visualization */}
        <div className="flex-1 bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide">
          <RoundVisualization />
        </div>

        {/* Right Column - Fundraising Timeline */}
        <div className="flex-1 bg-white overflow-y-auto scrollbar-hide">
          <FundraisingTimeline />
        </div>
      </div>
    </div>
  );
}
