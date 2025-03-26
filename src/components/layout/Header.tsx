import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, PieChart, Plus, Settings } from "lucide-react";

interface HeaderProps {
  title?: string;
  showNav?: boolean;
}

const Header = ({ title = "Expense Tracker", showNav = true }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 w-full bg-background border-b border-border shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <PieChart className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>

        {showNav && (
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
              )}
            >
              Transactions
            </Link>
            <Link
              to="/reports"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
              )}
            >
              Reports
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
