import { BudgetSection } from "./BudgetSection";

interface ExpensesProps {
  expenses: number[];
  onChange: (expenses: number[]) => void;
}

export function Expenses({ expenses, onChange }: ExpensesProps) {
  return (
    <BudgetSection
      items={expenses}
      title="Expenses"
      itemLabel="Expense"
      addItemButtonLabel="Add expense"
      removeItemButtonLabel="Remove expense"
      onChange={onChange}
    />
  );
}
