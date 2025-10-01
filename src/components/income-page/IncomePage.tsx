"use client";

import { useContext } from "react";
import { IncomeContext } from "@/contexts/IncomeContext";
import { BudgetSection } from "@/components/budget-section";

export function IncomePage() {
  const { incomes, addIncome, updateIncome, deleteIncome } =
    useContext(IncomeContext);

  return (
    <BudgetSection
      entries={incomes}
      title="Income"
      itemLabel="Income"
      addItemButtonLabel="Add income"
      onAddEntry={addIncome}
      onUpdateEntry={updateIncome}
      onDeleteEntry={deleteIncome}
    />
  );
}
