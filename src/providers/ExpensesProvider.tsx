import { ExpenseContext } from "@/contexts/ExpenseContext";
import { useExpenses } from "@/hooks/useExpenses";
import { enrichItem } from "@/core/budget-items";

interface ExpensesProviderProps {
  children: React.ReactNode;
}

export function ExpensesProvider({ children }: ExpensesProviderProps) {
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    addExpenses,
    isExpenseAtLimit,
  } = useExpenses();

  const enrichedExpenses = expenses.map(enrichItem);

  const expensesContext = {
    expenses: enrichedExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    addExpenses,
    isExpenseAtLimit,
  };

  return <ExpenseContext value={expensesContext}>{children}</ExpenseContext>;
}
