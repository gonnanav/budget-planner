"use client";

import { useIncomes } from "./hooks/useIncomes";
import { useExpenses } from "./hooks/useExpenses";
import { IncomeSection } from "./IncomeSection";
import { ExpenseSection } from "./ExpenseSection";
import { Balance } from "./Balance";
import { BudgetEntry } from "./core/types";

interface BudgetPlannerProps {
  initialIncomes?: BudgetEntry[];
  initialExpenses?: BudgetEntry[];
}

export function BudgetPlanner({
  initialIncomes,
  initialExpenses,
}: BudgetPlannerProps) {
  const { incomes, addIncome, updateIncome, deleteIncome } =
    useIncomes(initialIncomes);
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useExpenses(initialExpenses);

  return (
    <section className="flex flex-col gap-4">
      <IncomeSection
        incomes={incomes}
        onAddEntry={addIncome}
        onUpdateEntry={updateIncome}
        onDeleteEntry={deleteIncome}
      />
      <ExpenseSection
        expenses={expenses}
        onAddEntry={addExpense}
        onUpdateEntry={updateExpense}
        onDeleteEntry={deleteExpense}
      />
      <Balance incomes={incomes} expenses={expenses} />
    </section>
  );
}
