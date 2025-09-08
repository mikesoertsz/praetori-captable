"use client";

import { FundingRound } from "@/app/lib/types";
import RoundList from "./RoundList";

interface RoundVisualizationProps {
  rounds: FundingRound[];
}

export default function RoundVisualization({
  rounds,
}: RoundVisualizationProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Funding Rounds</h2>
        <RoundList rounds={rounds} />
      </div>
    </div>
  );
}
