export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  category: string;
  type: "income" | "expense";
  date: string;
  created_at?: string;
  updated_at?: string;
}

export interface TransactionFormData {
  amount: number;
  description: string;
  category: string;
  type: "income" | "expense";
  date: string;
}
