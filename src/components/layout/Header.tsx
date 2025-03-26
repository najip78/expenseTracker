import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  PieChart,
  Plus,
  Settings,
  LogOut,
  BarChart4,
  FileText,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TransactionForm from "@/components/transactions/TransactionForm";

interface HeaderProps {
  title?: string;
  showNav?: boolean;
}

const Header = ({ title = "Expense Tracker", showNav = true }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransactionFormOpen, setIsTransactionFormOpen] =
    React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const handleAddTransaction = (data: any) => {
    console.log("New transaction:", data);
    setIsTransactionFormOpen(false);
    // In a real app, this would update the state and possibly send data to a backend
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-background border-b border-border shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <PieChart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{title}</h1>
          </Link>
        </div>

        {showNav && (
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                isActive("/") && "text-primary font-semibold",
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                isActive("/transactions") && "text-primary font-semibold",
              )}
            >
              <FileText className="h-4 w-4" />
              Transactions
            </Link>
            <Link
              to="/reports"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                isActive("/reports") && "text-primary font-semibold",
              )}
            >
              <BarChart4 className="h-4 w-4" />
              Reports
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-2">
          {user && (
            <div className="mr-4 text-sm text-gray-600 hidden md:block">
              {user.email}
            </div>
          )}
          <Link to="/settings">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>

          <Dialog
            open={isTransactionFormOpen}
            onOpenChange={setIsTransactionFormOpen}
          >
            <DialogTrigger asChild>
              <Button>
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

          {user && (
            <Button variant="outline" size="icon" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
