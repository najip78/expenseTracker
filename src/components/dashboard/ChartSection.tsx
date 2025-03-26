import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryPieChart from "./charts/CategoryPieChart";
import SpendingTrendsChart from "./charts/SpendingTrendsChart";

interface ChartSectionProps {
  className?: string;
  categoryData?: {
    name: string;
    value: number;
    color: string;
  }[];
  trendData?: {
    name: string;
    amount: number;
  }[];
}

const ChartSection: React.FC<ChartSectionProps> = ({
  className = "",
  categoryData = [
    { name: "Food", value: 400, color: "#FF6384" },
    { name: "Transportation", value: 300, color: "#36A2EB" },
    { name: "Entertainment", value: 200, color: "#FFCE56" },
    { name: "Utilities", value: 150, color: "#4BC0C0" },
    { name: "Shopping", value: 250, color: "#9966FF" },
  ],
  trendData = [
    { name: "Jan", amount: 1200 },
    { name: "Feb", amount: 900 },
    { name: "Mar", amount: 1500 },
    { name: "Apr", amount: 1100 },
    { name: "May", amount: 1800 },
    { name: "Jun", amount: 1300 },
    { name: "Jul", amount: 950 },
  ],
}) => {
  return (
    <section className={`w-full py-6 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Spending Analytics
          </h2>
          <p className="text-gray-600">Visualize your spending patterns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <CategoryPieChart data={categoryData} />
          </div>
          <div className="w-full">
            <SpendingTrendsChart data={trendData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartSection;
