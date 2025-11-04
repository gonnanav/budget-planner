"use client";

import { useContext } from "react";
import { IncomeContext } from "@/contexts/IncomeContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { ItemDrawerContext } from "@/contexts/ItemDrawerContext";
import { CategoryDrawerContext } from "@/contexts/CategoryDrawerContext";

export default function Page() {
  const { incomes } = useContext(IncomeContext);
  const { incomeCategories } = useContext(IncomeCategoryContext);
  const { onOpen: onOpenItemDrawer, onEditItem } =
    useContext(ItemDrawerContext);
  const { onOpen: onOpenCategoryDrawer, onEditCategory } = useContext(
    CategoryDrawerContext,
  );

  const handleClickAddItem = () => {
    onOpenItemDrawer("income");
  };

  const handleClickItem = (id: string) => {
    onEditItem(id, "income");
  };

  const handleClickAddCategory = () => {
    onOpenCategoryDrawer("income");
  };

  const handleClickCategory = (categoryId: string) => {
    onEditCategory(categoryId, "income");
  };

  return (
    <BudgetSection
      title="Income"
      items={incomes}
      categories={incomeCategories}
      onClickAddItem={handleClickAddItem}
      onClickItem={handleClickItem}
      onClickAddCategory={handleClickAddCategory}
      onClickCategory={handleClickCategory}
    />
  );
}
