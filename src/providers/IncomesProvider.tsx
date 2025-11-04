import { IncomeContext } from "@/contexts/IncomeContext";
import { useIncomes } from "@/hooks/useIncomes";
import { enrichItem } from "@/core/budget-items";

interface IncomesProviderProps {
  children: React.ReactNode;
}

export function IncomesProvider({ children }: IncomesProviderProps) {
  const {
    incomes,
    addIncome,
    updateIncome,
    deleteIncome,
    addIncomes,
    isIncomeAtLimit,
  } = useIncomes();

  const enrichedIncomes = incomes.map(enrichItem);

  const incomesContext = {
    incomes: enrichedIncomes,
    addIncome,
    updateIncome,
    deleteIncome,
    addIncomes,
    isIncomeAtLimit,
  };

  return <IncomeContext value={incomesContext}>{children}</IncomeContext>;
}
