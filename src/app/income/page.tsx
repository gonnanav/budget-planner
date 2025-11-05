"use client";

import { useContext } from "react";
import { IncomeContext } from "@/contexts/IncomeContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { AppActionsContext } from "@/contexts/AppActionsContext";

export default function Page() {
  const { incomes } = useContext(IncomeContext);
  const { incomeCategories } = useContext(IncomeCategoryContext);
  const {
    onClickAddIncomeItem,
    onClickIncomeItem,
    onClickAddIncomeCategory,
    onClickIncomeCategory,
  } = useContext(AppActionsContext);

  return (
    <BudgetSection
      title="Income"
      items={incomes}
      categories={incomeCategories}
      onClickAddItem={onClickAddIncomeItem}
      onClickItem={onClickIncomeItem}
      onClickAddCategory={onClickAddIncomeCategory}
      onClickCategory={onClickIncomeCategory}
    />
  );
}
