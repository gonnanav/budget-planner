import { ExpenseContext } from "@/contexts/ExpenseContext";
import { useExpenses } from "@/hooks/useExpenses";

interface ExpensesProviderProps {
  children: React.ReactNode;
}

export function ExpensesProvider({ children }: ExpensesProviderProps) {
  const expensesContext = useExpenses();

  return <ExpenseContext value={expensesContext}>{children}</ExpenseContext>;
}
