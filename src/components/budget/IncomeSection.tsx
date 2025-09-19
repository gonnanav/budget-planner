import { BudgetSection } from "./BudgetSection";
import { BudgetEntry } from "./types";

interface IncomeSectionProps {
  incomes: BudgetEntry[];
  onAddEntry: (entry: BudgetEntry) => void;
  onUpdateEntry: (index: number, nextEntry: BudgetEntry) => void;
  onDeleteEntry: (index: number) => void;
}

export function IncomeSection({
  incomes,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
}: IncomeSectionProps) {
  return (
    <BudgetSection
      items={incomes}
      title="Incomes"
      itemLabel="Income"
      addItemButtonLabel="Add income"
      onAddEntry={onAddEntry}
      onUpdateEntry={onUpdateEntry}
      onDeleteEntry={onDeleteEntry}
    />
  );
}
