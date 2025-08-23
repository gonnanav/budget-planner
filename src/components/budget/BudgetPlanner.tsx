"use client";

import { useState } from "react";
import { createBudgetEntries } from "./budget-entries";
import { Incomes } from "./Incomes";
import { ExpenseSection } from "./ExpenseSection";
import { Balance } from "./Balance";

interface BudgetPlannerProps {
  initialIncomes?: number[];
  initialExpenses?: number[];
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
      <Incomes incomes={incomes} onChange={setIncomes} />
      <ExpenseSection expenses={expenses} onChange={setExpenses} />
      <Balance incomes={incomes} expenses={expenses} />
    </section>
  );
}
