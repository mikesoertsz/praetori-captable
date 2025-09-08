"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
      name: "Cap Table",
      founders: data.founders,
      investors: data.investors,
      optionPool: data.optionPool,
      advisors: data.advisors,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} layout="horizontal">
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" width={80} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="founders" stackId="a" fill="#3b82f6" name="Founders" />
        <Bar dataKey="investors" stackId="a" fill="#10b981" name="Investors" />
        <Bar
          dataKey="optionPool"
          stackId="a"
          fill="#f59e0b"
          name="Option Pool"
        />
        <Bar dataKey="advisors" stackId="a" fill="#8b5cf6" name="Advisors" />
      </BarChart>
    </ResponsiveContainer>
  );
}
