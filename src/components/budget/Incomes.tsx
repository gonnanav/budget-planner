import { BudgetSection } from "./BudgetSection";

interface IncomesProps {
  incomes: number[];
  onChange: (incomes: number[]) => void;
}

export function Incomes({ incomes, onChange }: IncomesProps) {
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
