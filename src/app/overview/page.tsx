"use client";

import { useContext } from "react";
import { IncomeContext } from "@/contexts/IncomeContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { Overview } from "@/overview";

export default function OverviewPage() {
  const { incomes } = useContext(IncomeContext);
  const { expenses } = useContext(ExpenseContext);

  return <Overview incomes={incomes} expenses={expenses} />;
}
