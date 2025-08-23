import { BudgetSection } from "./BudgetSection";

interface IncomeSectionProps {
  incomes: number[];
  onChange: (incomes: number[]) => void;
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
