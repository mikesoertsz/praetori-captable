"use client";

import { useState } from "react";
import { FundingData, FundingRound } from "@/app/lib/types";
import FounderInputs from "./FounderInputs";
import RoundInputs from "./RoundInputs";

interface InputPanelProps {
  data: FundingData;
  onUpdateData: (updatedData: FundingData) => void;
}

export default function InputPanel({ data, onUpdateData }: InputPanelProps) {
  const [selectedRoundId, setSelectedRoundId] = useState<string>("seed");

  const selectedRound =
    data.rounds.find((round) => round.id === selectedRoundId) || null;

  function handleUpdateFounder(
    id: string,
    field: keyof typeof data.founders.founder1,
    value: string | number
  ) {
    const updatedData = {
      ...data,
      founders: {
        ...data.founders,
        [id]: {
          ...data.founders[id],
          [field]: value,
        },
      },
    };
    onUpdateData(updatedData);
  }

  function handleUpdateRound(
    field: keyof FundingRound,
    value: string | number
  ) {
    if (!selectedRound) return;

    const updatedRounds = data.rounds.map((round) =>
      round.id === selectedRoundId ? { ...round, [field]: value } : round
    );

    const updatedData = {
      ...data,
      rounds: updatedRounds,
    };
    onUpdateData(updatedData);
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Funding Round Planner</h2>

        <div>
          <label className="block text-sm font-medium mb-2">Select Round</label>
          <select
            value={selectedRoundId}
            onChange={(e) => setSelectedRoundId(e.target.value)}
            className="w-full p-2 border"
          >
            {data.rounds.map((round) => (
              <option key={round.id} value={round.id}>
                {round.name}
              </option>
            ))}
          </select>
        </div>

        <FounderInputs
          founders={data.founders}
          onUpdateFounder={handleUpdateFounder}
        />

        <RoundInputs
          selectedRound={selectedRound}
          onUpdateRound={handleUpdateRound}
        />
      </div>
    </div>
  );
}
