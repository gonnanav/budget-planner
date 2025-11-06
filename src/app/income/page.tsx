"use client";

import { useContext } from "react";
import { IncomeContext } from "@/contexts/IncomeContext";
import { BudgetSection } from "@/components/budget-section";
import { AppActionsContext } from "@/contexts/AppActionsContext";

export default function Page() {
  const { items, categories } = useContext(IncomeContext);
  const {
    onClickAddIncomeItem,
    onClickIncomeItem,
    onClickAddIncomeCategory,
    onClickIncomeCategory,
  } = useContext(AppActionsContext);

  return (
    <BudgetSection
      title="Income"
      items={items}
      categories={categories}
      onClickAddItem={onClickAddIncomeItem}
      onClickItem={onClickIncomeItem}
      onClickAddCategory={onClickAddIncomeCategory}
      onClickCategory={onClickIncomeCategory}
    />
  );
}
