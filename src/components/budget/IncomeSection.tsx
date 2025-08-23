import { BudgetSection } from "./BudgetSection";
import { BudgetEntry } from "./types";

interface IncomeSectionProps {
  incomes: BudgetEntry[];
  onChange: (incomes: BudgetEntry[]) => void;
}

export function IncomeSection({ incomes, onChange }: IncomeSectionProps) {
  return (
    <BudgetSection
      items={incomes}
      title="Incomes"
      itemLabel="Income"
      addItemButtonLabel="Add income"
      removeItemButtonLabel="Remove income"
      onChange={onChange}
    />
  );
}
