"use client";

import { useState } from "react";
import { FundingData, FundingRound } from "@/app/lib/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RoundInputs from "./RoundInputs";

interface InputPanelProps {
  data: FundingData;
  onUpdateData: (updatedData: FundingData) => void;
}

export default function InputPanel({ data, onUpdateData }: InputPanelProps) {
  const [selectedRoundId, setSelectedRoundId] = useState<string>("seed");

  const selectedRound =
    data.rounds.find((round) => round.id === selectedRoundId) || null;

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
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">Funding Round Planner</h2>

        <Tabs
          value={selectedRoundId}
          onValueChange={setSelectedRoundId}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4">
            {data.rounds.map((round) => (
              <TabsTrigger key={round.id} value={round.id}>
                {round.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedRoundId} className="mt-4">
            <RoundInputs
              selectedRound={selectedRound}
              onUpdateRound={handleUpdateRound}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
