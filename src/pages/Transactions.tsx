import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import RecentTransactions from "@/components/transactions/RecentTransactions";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TransactionForm from "@/components/transactions/TransactionForm";
import { fetchTransactions, deleteTransaction } from "@/lib/api";
import { Transaction } from "@/types/transaction";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@supabase/supabase-js";
import { preprocess } from "zod";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_KEY);

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
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

  const handleAddTransaction = async (data: any) => {
    console.log("New transaction:", data);
    const { error } = await supabase
    .from("transactions")
    .insert([data]);

  if (error) {
    console.error("Error adding transaction:", error.message);
  } else {
    console.log("Transaction successfully added to Supabase!");
  }

    setIsTransactionFormOpen(false);
     
    // and refresh the transactions list
    try {
      // Refresh transactions after adding
      const updatedTransactions = await fetchTransactions();
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error refreshing transactions:", error);
    }
  };

  const handleEditTransaction = (id: string) => {
    console.log("Edit transaction with ID:", id);
    // In a real implementation, this would open the form with the transaction data
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      // Refresh the transactions list
      const updatedTransactions = await fetchTransactions();
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600 mt-1">
              View and manage all your financial transactions
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
          {isLoading ? (
            <div className="flex justify-center py-12">
              <p className="text-gray-500">Loading transactions...</p>
            </div>
          ) : (
            <RecentTransactions
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
              transactions={transactions.length > 0 ? transactions : undefined}
            />
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2023 Expense Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
