import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
  type: z.enum(["expense", "income"]),
  category: z.string().min(1, { message: "Category is required" }),
  date: z.date(),
  notes: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof formSchema>;

interface TransactionFormProps {
  onSubmit?: (data: TransactionFormValues) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const expenseCategories = [
  "Food & Dining",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Education",
  "Personal Care",
  "Travel",
  "Other",
];

const incomeCategories = [
  "Salary",
  "Freelance",
  "Investments",
  "Gifts",
  "Refunds",
  "Other",
];

const TransactionForm = ({
  onSubmit = () => {},
  isOpen = true,
  onClose = () => {},
}: TransactionFormProps) => {
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense",
  );

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      type: "expense",
      category: "",
      date: new Date(),
      notes: "",
    },
  });

  const handleSubmit = (data: TransactionFormValues) => {
    onSubmit(data);
    form.reset();
  };

  const categories =
    transactionType === "expense" ? expenseCategories : incomeCategories;

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          {transactionType === "expense" ? "Add Expense" : "Add Income"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="flex space-x-2 mb-4">
              <Button
                type="button"
                variant={transactionType === "expense" ? "default" : "outline"}
                className="flex-1"
                onClick={() => {
                  setTransactionType("expense");
                  form.setValue("type", "expense");
                }}
              >
                <MinusIcon className="mr-2 h-4 w-4" />
                Expense
              </Button>
              <Button
                type="button"
                variant={transactionType === "income" ? "default" : "outline"}
                className="flex-1"
                onClick={() => {
                  setTransactionType("income");
                  form.setValue("type", "income");
                }}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Income
              </Button>
            </div>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        $
                      </span>
                      <Input
                        placeholder="0.00"
                        {...field}
                        className="pl-7"
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional details..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Transaction</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
