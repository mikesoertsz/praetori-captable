import { FundingRound, ChartData } from "@/app/lib/types";

export function useChartData(
  rounds: FundingRound[]
): (FundingRound & { chartData: ChartData[] })[] {
  return rounds.map((round) => ({
    ...round,
    chartData: [
      {
        name: "Cap Table",
        founders: round.capTable.founders,
        investors: round.capTable.investors,
        optionPool: round.capTable.optionPool,
        advisors: round.capTable.advisors,
      },
    ],
  }));
}
