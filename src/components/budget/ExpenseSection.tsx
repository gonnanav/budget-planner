import { BudgetSection } from "./BudgetSection";
import { BudgetEntry } from "./types";

interface ExpenseSectionProps {
  expenses: BudgetEntry[];
  onChange: (expenses: BudgetEntry[]) => void;
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
