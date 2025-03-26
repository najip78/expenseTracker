import { supabase } from "./supabase";
import { Transaction, TransactionFormData } from "@/types/transaction";

export async function fetchTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }

  return data || [];
}

export async function createTransaction(
  transaction: TransactionFormData,
): Promise<Transaction> {
  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        ...transaction,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }

  return data;
}

export async function updateTransaction(
  id: string,
  transaction: Partial<TransactionFormData>,
): Promise<Transaction> {
  const { data, error } = await supabase
    .from("transactions")
    .update(transaction)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }

  return data;
}

export async function deleteTransaction(id: string): Promise<void> {
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
}
