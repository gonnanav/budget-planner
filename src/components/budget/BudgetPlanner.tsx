"use client";

import { useState } from "react";
import { Incomes } from "./Incomes";
import { Expenses } from "./Expenses";
import { Balance } from "./Balance";

interface BudgetPlannerProps {
  initialIncomes?: number;
  initialExpenses?: number;
}

export function BudgetPlanner({
  initialIncomes = 0,
  initialExpenses = 0,
}: BudgetPlannerProps) {
  const [incomes, setIncomes] = useState(initialIncomes);
  const [expenses, setExpenses] = useState(initialExpenses);

  return (
    <section className="flex flex-col gap-4">
      <Incomes incomes={incomes} onChange={setIncomes} />
      <Expenses expenses={expenses} onChange={setExpenses} />
      <Balance incomes={incomes} expenses={expenses} />
    </section>
  );
}
