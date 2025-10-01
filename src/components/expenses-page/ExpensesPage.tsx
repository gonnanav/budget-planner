"use client";

import { useContext } from "react";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { BudgetSection } from "@/components/budget-section";

export function ExpensesPage() {
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenseContext);

  return (
    <BudgetSection
      entries={expenses}
      title="Expenses"
      itemLabel="Expense"
      addItemButtonLabel="Add expense"
      onAddEntry={addExpense}
      onUpdateEntry={updateExpense}
      onDeleteEntry={deleteExpense}
    />
  );
}
