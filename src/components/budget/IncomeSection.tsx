import { BudgetSection } from "./BudgetSection";
import { BudgetEntry } from "@/core/types";

interface IncomeSectionProps
  extends Omit<
    React.ComponentProps<typeof BudgetSection>,
    "entries" | "title" | "itemLabel" | "addItemButtonLabel"
  > {
  incomes: BudgetEntry[];
}

export function IncomeSection({ incomes, ...props }: IncomeSectionProps) {
  return (
    <BudgetSection
      entries={incomes}
      title="Income"
      itemLabel="Income"
      addItemButtonLabel="Add income"
      {...props}
    />
  );
}
