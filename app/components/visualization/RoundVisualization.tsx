"use client";

import RoundList from "./RoundList";
import { useFundingStore } from "@/app/store/fundingStore";

export default function RoundVisualization() {
  const { data } = useFundingStore();

  if (!data || !data.rounds || !data.founders) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Funding Rounds</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Funding Rounds</h2>
        <RoundList rounds={data.rounds} founders={data.founders} />
      </div>
    </div>
  );
}
