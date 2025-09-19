import { BudgetSection } from "./BudgetSection";
import { BudgetEntry } from "./types";

interface ExpenseSectionProps
  extends Omit<
    React.ComponentProps<typeof BudgetSection>,
    "items" | "title" | "itemLabel" | "addItemButtonLabel"
  > {
  expenses: BudgetEntry[];
}

export function ExpenseSection({ expenses, ...props }: ExpenseSectionProps) {
  return (
    <BudgetSection
      items={expenses}
      title="Expenses"
      itemLabel="Expense"
      addItemButtonLabel="Add expense"
      {...props}
    />
  );
}
