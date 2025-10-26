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

  const handleOpen = () => {
    onOpen("income");
  };

  const handleEditIncome = (id: string) => {
    onEditItem(id, "income");
  };

  const handleAddCategory = () => {
    onCategoryOpen("income");
  };

  const handleEditCategory = (categoryId: string) => {
    onEditCategory(categoryId, "income");
  };

  return (
    <BudgetSection
      items={enrichedIncomes}
      categories={enrichedIncomeCategories}
      title="Income"
      onAddItem={handleOpen}
      onEditItem={handleEditIncome}
      onAddCategory={handleAddCategory}
      onEditCategory={handleEditCategory}
    />
  );
}
