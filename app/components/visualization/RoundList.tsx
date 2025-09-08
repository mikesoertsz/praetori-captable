"use client";

import { FundingRound } from "@/app/lib/types";
import RoundListItem from "./RoundListItem";

interface RoundListProps {
  rounds: FundingRound[];
}

export default function RoundList({ rounds }: RoundListProps) {
  return (
    <ul className="space-y-4">
      {rounds.map((round) => (
        <RoundListItem key={round.id} round={round} />
      ))}
    </ul>
  );
}
