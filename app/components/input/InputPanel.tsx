"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useFundingStore } from "@/app/store/fundingStore";
import RoundInputs from "./RoundInputs";

export default function InputPanel() {
  const { data, selectedRoundId, setSelectedRound } = useFundingStore();

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">Funding Round Planner</h2>

        <Tabs
          value={selectedRoundId}
          onValueChange={setSelectedRound}
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
            <RoundInputs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
