import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Header from "@/components/layout/Header";
import SummaryCards from "@/components/dashboard/SummaryCards";
import ChartSection from "@/components/dashboard/ChartSection";
import RecentTransactions from "@/components/transactions/RecentTransactions";
import TransactionForm from "@/components/transactions/TransactionForm";
import { fetchTransactions } from "@/lib/api";
import { Transaction } from "@/types/transaction";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
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

  // Calculate summary data
  const calculateSummary = () => {
    if (transactions.length === 0) {
      return {
        totalExpenses: 0,
        totalIncome: 0,
        currentBalance: 0,
        expenseTrend: 0,
        incomeTrend: 0,
        balanceTrend: 0,
      };
    }

    const expenses = transactions.filter((t) => t.type === "expense");
    const income = transactions.filter((t) => t.type === "income");

    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const currentBalance = totalIncome - totalExpenses;

    // Mock trends for now (in a real app, would compare to previous period)
    const expenseTrend = 5.2;
    const incomeTrend = 3.8;
    const balanceTrend = -1.4;

    return {
      totalExpenses,
      totalIncome,
      currentBalance,
      expenseTrend,
      incomeTrend,
      balanceTrend,
    };
  };

  // Process transactions for category chart
  const getCategoryData = () => {
    const categoryMap = new Map();
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

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

  const summary = !isLoading ? calculateSummary() : undefined;
  const categoryData = !isLoading ? getCategoryData() : [];
  const monthlyTrends = !isLoading ? getMonthlyTrends() : [];

  const handleAddTransaction = (data: any) => {
    console.log("New transaction:", data);
    setIsTransactionFormOpen(false);
    // In a real app, this would update the state and possibly send data to a backend
  };

  const handleEditTransaction = (id: string) => {
    console.log("Edit transaction with ID:", id);
    // In a real app, this would open the form with the transaction data
  };

  const handleDeleteTransaction = (id: string) => {
    console.log("Delete transaction with ID:", id);
    // In a real app, this would show a confirmation dialog and then delete
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.email?.split("@")[0] || "User"}
            </h1>
            <p className="text-gray-600 mt-1">
              Here's an overview of your finances
            </p>
          </div>

          <Dialog
            open={isTransactionFormOpen}
            onOpenChange={setIsTransactionFormOpen}
          >
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <TransactionForm
                onSubmit={handleAddTransaction}
                onClose={() => setIsTransactionFormOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <p className="text-gray-500">Loading dashboard data...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Cards Section */}
            <section>
              <SummaryCards {...summary} />
            </section>

            {/* Charts Section */}
            <section>
              <ChartSection
                categoryData={categoryData}
                trendData={monthlyTrends}
              />
            </section>

            {/* Recent Transactions Section */}
            <section>
              <RecentTransactions
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
                transactions={transactions.slice(0, 5)}
              />
            </section>
          </div>
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
