import { BudgetSection } from "./BudgetSection";
import { BudgetEntry } from "@/core/types";

interface ExpenseSectionProps
  extends Omit<
    React.ComponentProps<typeof BudgetSection>,
    "entries" | "title" | "itemLabel" | "addItemButtonLabel"
  > {
  expenses: BudgetEntry[];
}

export function ExpenseSection({ expenses, ...props }: ExpenseSectionProps) {
  return (
    <BudgetSection
      entries={expenses}
      title="Expenses"
      itemLabel="Expense"
      addItemButtonLabel="Add expense"
      {...props}
    />
  );
}
