import { IncomeContext } from "@/contexts/IncomeContext";
import { useIncomes } from "@/hooks/useIncomes";
import { BudgetEntry } from "@/core/types";

interface IncomesProviderProps {
  initialIncomes?: BudgetEntry[];
  children: React.ReactNode;
}

export function IncomesProvider({
  initialIncomes,
  children,
}: IncomesProviderProps) {
  const incomesContext = useIncomes(initialIncomes);

  return <IncomeContext value={incomesContext}>{children}</IncomeContext>;
}
