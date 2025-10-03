import { IncomeContext } from "@/contexts/IncomeContext";
import { useIncomes } from "@/hooks/useIncomes";

interface IncomesProviderProps {
  children: React.ReactNode;
}

export function IncomesProvider({ children }: IncomesProviderProps) {
  const incomesContext = useIncomes();

  return <IncomeContext value={incomesContext}>{children}</IncomeContext>;
}
