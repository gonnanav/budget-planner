import { ExpenseContext } from "@/contexts/ExpenseContext";
import { useExpenses } from "@/hooks/useExpenses";
import { BudgetEntry } from "@/core/types";

interface ExpensesProviderProps {
  initialExpenses?: BudgetEntry[];
  children: React.ReactNode;
}

export function ExpensesProvider({
  children,
  initialExpenses,
}: ExpensesProviderProps) {
  const expensesContext = useExpenses(initialExpenses);

  return <ExpenseContext value={expensesContext}>{children}</ExpenseContext>;
}
