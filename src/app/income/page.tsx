"use client";

import { useContext } from "react";
import { IncomeContext } from "@/contexts/IncomeContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { enrichItem } from "@/core/budget-items";
import { enrichCategory } from "@/core/categories";
import { ItemDrawerContext } from "@/contexts/ItemDrawerContext";
import { CategoryDrawerContext } from "@/contexts/CategoryDrawerContext";

export default function Page() {
  const { incomes } = useContext(IncomeContext);
  const { incomeCategories } = useContext(IncomeCategoryContext);
  const { onEditItem, onOpen } = useContext(ItemDrawerContext);
  const { onOpen: onCategoryOpen, onEditCategory } = useContext(
    CategoryDrawerContext,
  );
  const enrichedIncomes = incomes.map(enrichItem);
  const enrichedIncomeCategories = incomeCategories.map((category) =>
    enrichCategory(category, enrichedIncomes),
  );

  const handleClickAddItem = () => {
    onOpen("income");
  };

  const handleClickItem = (id: string) => {
    onEditItem(id, "income");
  };

  const handleClickAddCategory = () => {
    onCategoryOpen("income");
  };

  const handleClickCategory = (categoryId: string) => {
    onEditCategory(categoryId, "income");
  };

  return (
    <BudgetSection
      title="Income"
      items={enrichedIncomes}
      categories={enrichedIncomeCategories}
      onClickAddItem={handleClickAddItem}
      onClickItem={handleClickItem}
      onClickAddCategory={handleClickAddCategory}
      onClickCategory={handleClickCategory}
    />
  );
}
