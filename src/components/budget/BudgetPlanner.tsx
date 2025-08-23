"use client";

import { useState } from "react";
import { createBudgetEntries } from "./budget-entries";
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
  const [incomes, setIncomes] = useState(createBudgetEntries(initialIncomes));
  const [expenses, setExpenses] = useState(
    createBudgetEntries(initialExpenses),
  );

  return (
    <section className="flex flex-col gap-4">
      <IncomeSection incomes={incomes} onChange={setIncomes} />
      <ExpenseSection expenses={expenses} onChange={setExpenses} />
      <Balance incomes={incomes} expenses={expenses} />
    </section>
  );
}
