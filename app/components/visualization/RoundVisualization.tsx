"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown } from "lucide-react";
import RoundListItem from "./RoundListItem";
import { useFundingStore } from "@/app/store/fundingStore";

interface RoundVisualizationProps {
  showFounderNetWorth: boolean;
}

export default function RoundVisualization({
  showFounderNetWorth,
}: RoundVisualizationProps) {
  const { data } = useFundingStore();
  const [openItems, setOpenItems] = useState<string[]>([]);

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

  const toggleAll = () => {
    if (openItems.length === data.rounds.length) {
      setOpenItems([]);
    } else {
      setOpenItems(data.rounds.map((round) => round.id));
    }
  };

  const allOpen = openItems.length === data.rounds.length;

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-3 h-3" />;
    if (value < 0) return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  const getTrendColor = (value: number) => {
    return value > 0
      ? "text-green-600"
      : value < 0
      ? "text-red-600"
      : "text-gray-600";
  };

  const formatPercentage = (value: number) => {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Funding Rounds</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAll}
            className="flex items-center gap-2"
          >
            {allOpen ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Close All
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Open All
              </>
            )}
          </Button>
        </div>

        <Accordion
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
          className="w-full -space-y-px shadow-md overflow-hidden rounded-2xl border border-gray-200"
        >
          {data.rounds.map((round, index) => {
            const previousRound =
              index > 0 ? data.rounds[index - 1] : undefined;
            const valuationChange = previousRound
              ? ((round.postMoneyValuation - previousRound.postMoneyValuation) /
                  previousRound.postMoneyValuation) *
                100
              : 0;

            return (
              <AccordionItem
                key={round.id}
                value={round.id}
                className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
              >
                <AccordionTrigger className="justify-start gap-3 rounded-md py-2 text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
                  <span>{round.name}</span>
                  {previousRound && valuationChange !== 0 && (
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 ${getTrendColor(
                        valuationChange
                      )}`}
                    >
                      {getTrendIcon(valuationChange)}
                      <span className="text-xs font-medium">
                        {formatPercentage(valuationChange)}
                      </span>
                    </div>
                  )}
                </AccordionTrigger>
                <AccordionContent className="ps-7 pb-2 text-muted-foreground">
                  <RoundListItem
                    round={round}
                    founders={data.founders}
                    previousRound={previousRound}
                    showFounderNetWorth={showFounderNetWorth}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
