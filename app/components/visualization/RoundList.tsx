"use client";

import { FundingRound, FundingData } from "@/app/lib/types";
import RoundListItem from "./RoundListItem";

interface RoundListProps {
  rounds: FundingRound[];
  founders: FundingData["founders"];
}

export default function RoundList({ rounds, founders }: RoundListProps) {
  return (
    <ul className="space-y-6">
      {rounds.map((round, index) => (
        <RoundListItem
          key={round.id}
          round={round}
          founders={founders}
          previousRound={index > 0 ? rounds[index - 1] : undefined}
        />
      ))}
    </ul>
  );
}
