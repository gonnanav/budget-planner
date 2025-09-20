import { BudgetSection } from "./BudgetSection";
import { BudgetEntry } from "./core/types";

interface IncomeSectionProps
  extends Omit<
    React.ComponentProps<typeof BudgetSection>,
    "items" | "title" | "itemLabel" | "addItemButtonLabel"
  > {
  incomes: BudgetEntry[];
}

export function IncomeSection({ incomes, ...props }: IncomeSectionProps) {
  return (
    <BudgetSection
      items={incomes}
      title="Incomes"
      itemLabel="Income"
      addItemButtonLabel="Add income"
      {...props}
    />
  );
}
