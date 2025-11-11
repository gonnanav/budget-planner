"use client";

import { useContext } from "react";
import { IncomeContext } from "@/contexts/IncomeContext";
import { BudgetSectionScreen } from "@/components/budget-section";

export default function Page() {
  const {
    items,
    categories,
    onClickAddIncomeItem,
    onClickIncomeItem,
    onClickAddIncomeCategory,
    onClickIncomeCategory,
  } = useContext(IncomeContext);

  return (
    <BudgetSectionScreen
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
