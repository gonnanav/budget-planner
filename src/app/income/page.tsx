"use client";

import { IncomeSection } from "@/components/budget/IncomeSection";
import { IncomeContext } from "@/contexts/IncomeContext";
import { useContext } from "react";

export default function IncomePage() {
  const { incomes, addIncome, updateIncome, deleteIncome } =
    useContext(IncomeContext);

  return (
    <IncomeSection
      incomes={incomes}
      onAddEntry={addIncome}
      onUpdateEntry={updateIncome}
      onDeleteEntry={deleteIncome}
    />
  );
}
