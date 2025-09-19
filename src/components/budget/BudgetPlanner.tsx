"use client";

import { useState } from "react";
import {
  createBudgetEntries,
  addBudgetEntry,
  updateBudgetEntry,
  removeBudgetEntry,
} from "./budget-entries";
import { IncomeSection } from "./IncomeSection";
import { ExpenseSection } from "./ExpenseSection";
import { Balance } from "./Balance";
import { BudgetEntry } from "./types";

interface BudgetPlannerProps {
  initialIncomes?: BudgetEntry[];
  initialExpenses?: BudgetEntry[];
}

export function BudgetPlanner({
  initialIncomes,
  initialExpenses,
}: BudgetPlannerProps) {
  const [incomes, setIncomes] = useState(() =>
    createBudgetEntries(initialIncomes),
  );
  const [expenses, setExpenses] = useState(() =>
    createBudgetEntries(initialExpenses),
  );

  const handleAddIncome = (income: BudgetEntry) => {
    setIncomes(addBudgetEntry(incomes, income ?? 0));
  };
  const handleUpdateIncome = (index: number, nextIncome: BudgetEntry) => {
    setIncomes(updateBudgetEntry(incomes, index, nextIncome));
  };
  const handleDeleteIncome = (index: number) => {
    setIncomes(removeBudgetEntry(incomes, index));
  };

  const handleAddExpense = (expense: BudgetEntry) => {
    setExpenses(addBudgetEntry(expenses, expense ?? 0));
  };
  const handleUpdateExpense = (index: number, nextExpense: BudgetEntry) => {
    setExpenses(updateBudgetEntry(expenses, index, nextExpense));
  };
  const handleDeleteExpense = (index: number) => {
    setExpenses(removeBudgetEntry(expenses, index));
  };

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
