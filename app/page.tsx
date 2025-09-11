"use client";

import { useState } from "react";
import { FundingData } from "@/app/lib/types";
import { calculateRoundMetrics } from "@/app/lib/calculationEngine";
import InputPanel from "./components/input/InputPanel";
import RoundVisualization from "./components/visualization/RoundVisualization";
import FundraisingTimeline from "./components/visualization/FundraisingTimeline";
import fundingData from "@/app/data/fundingRounds.json";

export default function Home() {
  const [data, setData] = useState<FundingData>(fundingData as FundingData);

  function handleUpdateData(updatedData: FundingData) {
    // Recalculate rounds when data is updated
    const updatedRounds = updatedData.rounds.map((round) =>
      calculateRoundMetrics(round)
    );
    setData({
      ...updatedData,
      rounds: updatedRounds,
    });
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-slate-100 to-white">
      <div className="h-screen flex">
        {/* Left Column - Input Panel */}
        <div className="w-full max-w-[600px] border-r border-gray-200 overflow-y-auto scrollbar-hide">
          <InputPanel data={data} onUpdateData={handleUpdateData} />
        </div>

        {/* Middle Column - Round Visualization */}
        <div className="flex-1 bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide">
          <RoundVisualization data={data} />
        </div>

        {/* Right Column - Fundraising Timeline */}
        <div className="flex-1 bg-white overflow-y-auto scrollbar-hide">
          <FundraisingTimeline data={data} />
        </div>
      </div>
    </div>
  );
}
