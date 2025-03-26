import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Header from "./layout/Header";
import SummaryCards from "./dashboard/SummaryCards";
import ChartSection from "./dashboard/ChartSection";
import RecentTransactions from "./transactions/RecentTransactions";
import TransactionForm from "./transactions/TransactionForm";

interface HomeProps {
  userName?: string;
}

const Home = ({ userName = "User" }: HomeProps) => {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);

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
              Welcome back, {userName}
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

        <div className="space-y-8">
          {/* Summary Cards Section */}
          <section>
            <SummaryCards
              totalExpenses={1250.45}
              totalIncome={2500.0}
              currentBalance={1249.55}
              expenseTrend={12.5}
              incomeTrend={8.2}
              balanceTrend={-4.3}
            />
          </section>

          {/* Charts Section */}
          <section>
            <ChartSection
              categoryData={[
                { name: "Food", value: 400, color: "#FF6384" },
                { name: "Transportation", value: 300, color: "#36A2EB" },
                { name: "Entertainment", value: 200, color: "#FFCE56" },
                { name: "Utilities", value: 150, color: "#4BC0C0" },
                { name: "Shopping", value: 250, color: "#9966FF" },
              ]}
              trendData={[
                { name: "Jan", amount: 1200 },
                { name: "Feb", amount: 900 },
                { name: "Mar", amount: 1500 },
                { name: "Apr", amount: 1100 },
                { name: "May", amount: 1800 },
                { name: "Jun", amount: 1300 },
                { name: "Jul", amount: 950 },
              ]}
            />
          </section>

          {/* Recent Transactions Section */}
          <section>
            <RecentTransactions
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
              transactions={[
                {
                  id: "1",
                  date: "2023-06-15",
                  description: "Grocery shopping",
                  amount: 85.75,
                  type: "expense",
                  category: "Food",
                },
                {
                  id: "2",
                  date: "2023-06-14",
                  description: "Salary deposit",
                  amount: 2500.0,
                  type: "income",
                  category: "Salary",
                },
                {
                  id: "3",
                  date: "2023-06-12",
                  description: "Electric bill",
                  amount: 120.5,
                  type: "expense",
                  category: "Utilities",
                },
                {
                  id: "4",
                  date: "2023-06-10",
                  description: "Restaurant dinner",
                  amount: 65.3,
                  type: "expense",
                  category: "Dining",
                },
                {
                  id: "5",
                  date: "2023-06-08",
                  description: "Freelance payment",
                  amount: 350.0,
                  type: "income",
                  category: "Freelance",
                },
              ]}
            />
          </section>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2023 Expense Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
