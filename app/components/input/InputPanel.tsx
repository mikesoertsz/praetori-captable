"use client";

import { useId } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useFundingStore } from "@/app/store/fundingStore";
import RoundInputs from "./RoundInputs";

interface InputPanelProps {
  showFounderNetWorth: boolean;
  setShowFounderNetWorth: (value: boolean) => void;
}

export default function InputPanel({
  showFounderNetWorth,
  setShowFounderNetWorth,
}: InputPanelProps) {
  const { data, selectedRoundId, setSelectedRound } = useFundingStore();
  const id = useId();

  const selectedRound = data.rounds.find(
    (round) => round.id === selectedRoundId
  );

  return (
    <div className="h-full flex flex-col justify-between p-4">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Funding Round Planner</h2>

        <Tabs
          value={selectedRoundId}
          onValueChange={setSelectedRound}
          className="items-center"
        >
          <TabsList className="gap-1 bg-transparent">
            {data.rounds.map((round) => (
              <TabsTrigger
                key={round.id}
                value={round.id}
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
              >
                {round.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedRoundId} className="mt-4">
            <RoundInputs />
          </TabsContent>
        </Tabs>
      </div>

      {/* Round Summary at Bottom */}
      {selectedRound && (
        <div className="bg-white rounded-md p-4 border shadow-sm">
          <h4 className="text-xs mb-4 font-semibold text-gray-900">
            {selectedRound.name}
          </h4>
          <ul className="grid grid-cols-2 gap-4">
            <li className="text-left">
              <div className="text-xl font-semibold text-gray-900">
                €{(selectedRound.postMoneyValuation / 1000000).toFixed(0)}M
              </div>
              <div className="text-[11px] font-semibold text-indigo-500 uppercase tracking-tight">
                Post-money valuation
              </div>
            </li>
            <li className="text-left">
              <div className="text-xl font-semibold text-gray-900">
                {selectedRound.targetDilution.toFixed(1)}%
              </div>
              <div className="text-[11px] font-semibold text-indigo-500 uppercase tracking-tight">
                Total dilution
              </div>
            </li>
            <li className="text-left">
              <div className="text-xl font-semibold text-gray-900">
                {selectedRound.capTable.investors.toFixed(1)}%
              </div>
              <div className="text-[11px] font-semibold text-indigo-500 uppercase tracking-tight">
                Investor ownership
              </div>
            </li>
            <li className="text-left">
              <div className="text-xl font-semibold text-gray-900">
                {selectedRound.capTable.founders.toFixed(1)}%
              </div>
              <div className="text-[11px] font-semibold text-indigo-500 uppercase tracking-tight">
                Founder ownership (after dilution)
              </div>
            </li>
            <li className="text-left">
              <div className="text-xl font-semibold text-gray-900">
                €{(selectedRound.postMoneyValuation / 1000000).toFixed(2)}
              </div>
              <div className="text-[11px] font-semibold text-indigo-500 uppercase tracking-tight">
                Price per share (implied)
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* Checkbox for showing founder net worth */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)]">
          <Checkbox
            id={id}
            checked={showFounderNetWorth}
            onCheckedChange={setShowFounderNetWorth}
          />
          <Label htmlFor={id}>Show individual founder net worth</Label>
        </div>
      </div>
    </div>
  );
}
