import { BudgetSection } from "./BudgetSection";

interface ExpenseSectionProps {
  expenses: number[];
  onChange: (expenses: number[]) => void;
}

export function ExpenseSection({ expenses, onChange }: ExpenseSectionProps) {
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
