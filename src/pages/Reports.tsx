import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryPieChart from "@/components/dashboard/charts/CategoryPieChart";
import SpendingTrendsChart from "@/components/dashboard/charts/SpendingTrendsChart";
import { fetchTransactions } from "@/lib/api";
import { Transaction } from "@/types/transaction";
import { useAuth } from "@/contexts/AuthContext";

export default function Reports() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadTransactions();
    }
  }, [user]);

  // Process transactions for category chart
  const getCategoryData = () => {
    const categoryMap = new Map();
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
    ];

    transactions
      .filter((t) => t.type === "expense")
      .forEach((transaction) => {
        const category = transaction.category || "Other";
        const currentAmount = categoryMap.get(category) || 0;
        categoryMap.set(category, currentAmount + transaction.amount);
      });

    return Array.from(categoryMap.entries()).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  };

  // Process transactions for monthly trends
  const getMonthlyTrends = () => {
    const monthlyData = new Map();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize all months with zero
    months.forEach((month) => monthlyData.set(month, 0));

    transactions
      .filter((t) => t.type === "expense")
      .forEach((transaction) => {
        const date = new Date(transaction.date);
        const month = months[date.getMonth()];
        const currentAmount = monthlyData.get(month) || 0;
        monthlyData.set(month, currentAmount + transaction.amount);
      });

    return Array.from(monthlyData.entries()).map(([name, amount]) => ({
      name,
      amount,
    }));
  };

  const categoryData = !isLoading ? getCategoryData() : [];
  const monthlyTrends = !isLoading ? getMonthlyTrends() : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">
            Analyze your spending patterns and financial trends
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <p className="text-gray-500">Loading reports data...</p>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategoryPieChart
                  data={categoryData}
                  title="Expense Distribution"
                />
                <SpendingTrendsChart
                  data={monthlyTrends}
                  title="Monthly Spending"
                  description="Your spending patterns over time"
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Spending Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    This overview shows your spending patterns across different
                    categories and time periods. Use these insights to identify
                    areas where you might be able to save money.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <CategoryPieChart
                data={categoryData}
                title="Expense Categories"
                className="h-[500px]"
              />

              <Card>
                <CardHeader>
                  <CardTitle>Category Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: category.color }}
                          />
                          <span>{category.name}</span>
                        </div>
                        <span className="font-medium">
                          ${category.value.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <SpendingTrendsChart
                data={monthlyTrends}
                title="Monthly Spending Trends"
                description="Track how your spending changes over time"
                className="h-[500px]"
              />

              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    This chart shows your spending patterns over time. Look for
                    seasonal trends or unusual spikes in spending.
                  </p>

                  <div className="space-y-4">
                    {monthlyTrends.map((month, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>{month.name}</span>
                        <span className="font-medium">
                          ${month.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2023 Expense Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
