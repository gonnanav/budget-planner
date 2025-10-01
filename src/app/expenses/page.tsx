"use client";

import { useContext } from "react";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { ExpenseSection } from "@/components/budget-section/ExpenseSection";

export default function ExpensesPage() {
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenseContext);

  return (
    <ExpenseSection
      expenses={expenses}
      onAddEntry={addExpense}
      onUpdateEntry={updateExpense}
      onDeleteEntry={deleteExpense}
    />
  );
}
