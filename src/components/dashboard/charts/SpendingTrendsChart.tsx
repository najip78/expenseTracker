import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface SpendingTrendsChartProps {
  data?: SpendingData[];
  title?: string;
  description?: string;
}

interface SpendingData {
  name: string;
  amount: number;
}

const defaultData: SpendingData[] = [
  { name: "Jan", amount: 1200 },
  { name: "Feb", amount: 900 },
  { name: "Mar", amount: 1500 },
  { name: "Apr", amount: 1100 },
  { name: "May", amount: 1800 },
  { name: "Jun", amount: 1300 },
  { name: "Jul", amount: 950 },
];

const SpendingTrendsChart: React.FC<SpendingTrendsChartProps> = ({
  data = defaultData,
  title = "Monthly Spending Trends",
  description = "Your spending patterns over time",
}) => {
  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, "Amount"]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="amount"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingTrendsChart;
