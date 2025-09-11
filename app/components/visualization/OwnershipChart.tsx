"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

interface OwnershipChartProps {
  data: {
    founders: number;
    investors: number;
    optionPool: number;
    advisors: number;
  };
}

export default function OwnershipChart({ data }: OwnershipChartProps) {
  const chartData = [
    {
      category: "founders",
      ownership: data.founders || 0,
    },
    {
      category: "investors",
      ownership: data.investors || 0,
    },
    {
      category: "optionPool",
      ownership: data.optionPool || 0,
    },
    {
      category: "advisors",
      ownership: data.advisors || 0,
    },
  ];

  return (
    <div className="flex flex-col border rounded-lg bg-white">
      <div className="flex flex-col items-center pb-0 p-6">
        <h3 className="text-lg font-semibold">Cap Table</h3>
        <p className="text-sm text-muted-foreground">Ownership Distribution</p>
      </div>
      <div className="flex-1 pb-0 px-6">
        <div className="mx-auto aspect-square max-h-[250px] w-full flex items-center justify-center">
          <PieChart width={250} height={250}>
            <Pie
              data={chartData}
              dataKey="ownership"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 text-sm p-6 pt-0">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total ownership:{" "}
          {Object.values(data)
            .reduce((sum, val) => sum + val, 0)
            .toFixed(1)}
          % <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing ownership distribution for this round
        </div>
      </div>
    </div>
  );
}
