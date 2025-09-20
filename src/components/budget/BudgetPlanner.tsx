"use client";

import { useBudgetEntries } from "./useBudgetEntries";
import { IncomeSection } from "./IncomeSection";
import { ExpenseSection } from "./ExpenseSection";
import { Balance } from "./Balance";
import { BudgetEntryInput } from "./core/types";

interface BudgetPlannerProps {
  initialIncomes?: BudgetEntryInput[];
  initialExpenses?: BudgetEntryInput[];
}

export function BudgetPlanner({
  initialIncomes,
  initialExpenses,
}: BudgetPlannerProps) {
  const {
    entries: incomes,
    handleAddEntry: handleAddIncome,
    handleUpdateEntry: handleUpdateIncome,
    handleDeleteEntry: handleDeleteIncome,
  } = useBudgetEntries(initialIncomes);

  const {
    entries: expenses,
    handleAddEntry: handleAddExpense,
    handleUpdateEntry: handleUpdateExpense,
    handleDeleteEntry: handleDeleteExpense,
  } = useBudgetEntries(initialExpenses);

  return (
    <section className="flex flex-col gap-4">
      <IncomeSection
        incomes={incomes}
        onAddEntry={handleAddIncome}
        onUpdateEntry={handleUpdateIncome}
        onDeleteEntry={handleDeleteIncome}
      />
      <ExpenseSection
        expenses={expenses}
        onAddEntry={handleAddExpense}
        onUpdateEntry={handleUpdateExpense}
        onDeleteEntry={handleDeleteExpense}
      />
      <Balance incomes={incomes} expenses={expenses} />
    </section>
  );
}
