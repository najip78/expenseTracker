import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  amount: number;
  trend: number;
  trendLabel: string;
  icon: React.ReactNode;
  trendType: "positive" | "negative" | "neutral";
}

const SummaryCard = ({
  title = "Summary",
  amount = 0,
  trend = 0,
  trendLabel = "from last month",
  icon = <DollarSignIcon className="h-4 w-4" />,
  trendType = "neutral",
}: SummaryCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const getTrendIcon = () => {
    if (trendType === "positive") {
      return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
    } else if (trendType === "negative") {
      return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getTrendColor = () => {
    if (trendType === "positive") return "text-green-500";
    if (trendType === "negative") return "text-red-500";
    return "text-gray-500";
  };

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className="rounded-full bg-gray-100 p-2">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(amount)}</div>
        <div className="mt-1 flex items-center text-xs">
          {getTrendIcon()}
          <span className={`${getTrendColor()} ml-1`}>{trend}%</span>
          <span className="text-gray-500 ml-1">{trendLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface SummaryCardsProps {
  totalExpenses?: number;
  totalIncome?: number;
  currentBalance?: number;
  expenseTrend?: number;
  incomeTrend?: number;
  balanceTrend?: number;
}

const SummaryCards = ({
  totalExpenses = 1250.45,
  totalIncome = 2500.0,
  currentBalance = 1249.55,
  expenseTrend = 12.5,
  incomeTrend = 8.2,
  balanceTrend = -4.3,
}: SummaryCardsProps) => {
  return (
    <div className="w-full bg-gray-50 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Total Expenses"
          amount={totalExpenses}
          trend={expenseTrend}
          trendLabel="from last month"
          icon={<ArrowDownIcon className="h-4 w-4 text-red-500" />}
          trendType="negative"
        />
        <SummaryCard
          title="Total Income"
          amount={totalIncome}
          trend={incomeTrend}
          trendLabel="from last month"
          icon={<ArrowUpIcon className="h-4 w-4 text-green-500" />}
          trendType="positive"
        />
        <SummaryCard
          title="Current Balance"
          amount={currentBalance}
          trend={balanceTrend}
          trendLabel="from last month"
          icon={<DollarSignIcon className="h-4 w-4" />}
          trendType={balanceTrend >= 0 ? "positive" : "negative"}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
