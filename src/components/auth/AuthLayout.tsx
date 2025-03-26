import React from "react";
import { PieChart } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AuthLayout({
  children,
  title = "Expense Tracker",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <PieChart className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">{children}</div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          © 2023 Expense Tracker. All rights reserved.
        </p>
      </div>
    </div>
  );
}
