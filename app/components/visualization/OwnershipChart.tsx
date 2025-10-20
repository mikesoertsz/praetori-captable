"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, Tooltip } from "recharts";
import { getFounderColor } from "@/app/lib/utils";

interface OwnershipChartProps {
  capTable: {
    founders: number;
    investors: number;
    optionPool: number;
    investorGroups: Array<{
      name: string;
      ownership: number;
      amountInvested: number;
    }>;
  };
  founders: Record<string, { name: string; ownership: number }>;
  roundName?: string;
}

export default function OwnershipChart({
  capTable,
  founders,
  roundName,
}: OwnershipChartProps) {
  // Create individual founder entries
  const founderEntries = Object.entries(founders)
    .sort(([, founderA], [, founderB]) => {
      // Put Jordi first, then Mike, then Robin
      if (founderA.name === "Jordi") return -1;
      if (founderB.name === "Jordi") return 1;
      if (founderA.name === "Mike") return -1;
      if (founderB.name === "Mike") return 1;
      if (founderA.name === "Robin") return -1;
      if (founderB.name === "Robin") return 1;
      return 0;
    })
    .map(([, founder]) => ({
      category: founder.name,
      ownership: (founder.ownership / 100) * capTable.founders,
      fill: getFounderColor(founder.name),
    }));

  // Create individual investor group entries
  const investorEntries =
    capTable.investorGroups?.map((group, index) => ({
      category: group.name,
      ownership: group.ownership,
      fill: `hsl(${240 + index * 60}, 70%, 60%)`, // Different shades of blue/purple
    })) || [];

  // If no investor groups, create a generic "Investors" entry
  const hasInvestorGroups = investorEntries.length > 0;
  const investorEntry = hasInvestorGroups
    ? []
    : [
        {
          category: "Investors",
          ownership: capTable.investors,
          fill: "#3B82F6", // Blue
        },
      ];

  const chartData = [
    ...founderEntries,
    ...investorEntries,
    ...investorEntry,
    {
      category: "optionPool",
      ownership: capTable.optionPool || 0,
      fill: "#EF4444", // Red
    },
  ];

  // Debug: Log the chart data to see what's being calculated
  console.log("Chart Data Debug:", {
    founderEntries,
    investorEntries,
    investorEntry,
    chartData,
    totalOwnership: chartData.reduce((sum, item) => sum + item.ownership, 0),
    capTable,
  });

  // Create simplified founder vs others chart data
  const founderVsOthersData = [
    {
      category: "Founders",
      ownership: capTable.founders,
      fill: "#10B981", // Green for founders
    },
    {
      category: "Others",
      ownership: capTable.investors + (capTable.optionPool || 0),
      fill: "#6B7280", // Gray for others
    },
  ];

  // Verify math - total should equal 100%
  const totalOwnership = chartData.reduce(
    (sum, item) => sum + item.ownership,
    0
  );
  const founderVsOthersTotal = founderVsOthersData.reduce(
    (sum, item) => sum + item.ownership,
    0
  );

  console.log("Math Verification:", {
    detailedTotal: totalOwnership,
    simplifiedTotal: founderVsOthersTotal,
    founders: capTable.founders,
    investors: capTable.investors,
    optionPool: capTable.optionPool,
    othersTotal: capTable.investors + (capTable.optionPool || 0),
  });

  return (
    <div className="flex flex-col border rounded-lg bg-white">
      <div className="flex flex-col items-center pb-0 p-6">
        <h3 className="text-lg font-semibold">
          {roundName ? `${roundName} Cap Table` : "Cap Table"}
        </h3>
        <p className="text-sm text-muted-foreground">Ownership Distribution</p>
      </div>
      <div className="flex-1 pb-0 px-6">
        <div className="flex items-center justify-center gap-8">
          {/* Detailed Chart */}
          <div className="flex flex-col items-center gap-4">
            <PieChart width={200} height={200}>
              <Pie
                data={chartData}
                dataKey="ownership"
                nameKey="category"
                innerRadius={50}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value.toFixed(1)}%`,
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
                labelStyle={{ color: "#374151" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
            <div className="flex flex-col gap-2">
              {chartData.map((entry, index) => (
                <div
                  key={`legend-${index}`}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.fill }}
                  />
                  <span className="text-xs text-gray-700">
                    {entry.category.charAt(0).toUpperCase() +
                      entry.category.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Simplified Founder vs Others Chart */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <PieChart width={200} height={200}>
                <Pie
                  data={founderVsOthersData}
                  dataKey="ownership"
                  nameKey="category"
                  innerRadius={50}
                  strokeWidth={5}
                >
                  {founderVsOthersData.map((entry, index) => (
                    <Cell key={`simplified-cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(1)}%`,
                    name.charAt(0).toUpperCase() + name.slice(1),
                  ]}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
              {/* Founder label in the center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-800">
                    {capTable.founders.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-600">Founders</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#10B981" }}
                />
                <span className="text-xs text-gray-700">Founders</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#6B7280" }}
                />
                <span className="text-xs text-gray-700">Others</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 text-sm p-6 pt-0">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total ownership: {totalOwnership.toFixed(1)}%{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none text-center">
          <div>Founders: {capTable.founders.toFixed(1)}%</div>
          <div>Investors: {capTable.investors.toFixed(1)}%</div>
          <div>Option Pool: {capTable.optionPool.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
}
