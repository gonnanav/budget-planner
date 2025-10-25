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
      items={incomes.map(enrichItem)}
      categories={incomeCategories.map((category) =>
        enrichCategory(category, incomes),
      )}
      title="Income"
      onAddItem={handleOpen}
      onEditItem={handleEditIncome}
      onAddCategory={handleAddCategory}
      onEditCategory={handleEditCategory}
    />
  );
}
