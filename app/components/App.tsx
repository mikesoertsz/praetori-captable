"use client";

import { useState } from "react";
import { FundingData } from "@/app/lib/types";
import { calculateRoundMetrics } from "@/app/lib/calculationEngine";
import InputPanel from "./input/InputPanel";
import RoundVisualization from "./visualization/RoundVisualization";
import fundingData from "@/app/data/fundingRounds.json";

export default function App() {
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
    <div className="h-screen grid grid-cols-2">
      {/* Left Column - Input Panel */}
      <div className="border-r">
        <InputPanel data={data} onUpdateData={handleUpdateData} />
      </div>

      {/* Right Column - Round Visualization */}
      <div>
        <RoundVisualization rounds={data.rounds} />
      </div>
    </div>
  );
}
