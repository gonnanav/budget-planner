import { BudgetSection } from "./BudgetSection";
import { BudgetEntry } from "./types";

interface ExpenseSectionProps {
  expenses: BudgetEntry[];
  onAddEntry: (entry: BudgetEntry) => void;
  onUpdateEntry: (index: number, nextEntry: BudgetEntry) => void;
  onDeleteEntry: (index: number) => void;
}

export function ExpenseSection({
  expenses,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
}: ExpenseSectionProps) {
  return (
    <BudgetSection
      items={expenses}
      title="Expenses"
      itemLabel="Expense"
      addItemButtonLabel="Add expense"
      onAddEntry={onAddEntry}
      onUpdateEntry={onUpdateEntry}
      onDeleteEntry={onDeleteEntry}
    />
  );
}
