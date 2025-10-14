"use client";

import { useContext } from "react";
import { useDisclosure } from "@heroui/react";
import { IncomeContext } from "@/contexts/IncomeContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { CategoriesDrawer } from "@/components/categories-drawer";

export function IncomePage() {
  const { incomes, addIncome, updateIncome, deleteIncome } =
    useContext(IncomeContext);
  const {
    incomeCategories,
    addIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory,
  } = useContext(IncomeCategoryContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <BudgetSection
        entries={incomes}
        categories={incomeCategories}
        title="Income"
        itemLabel="Income"
        addItemButtonLabel="Add income"
        onAddEntry={addIncome}
        onUpdateEntry={updateIncome}
        onDeleteEntry={deleteIncome}
        onClickCategories={onOpen}
      />
      <CategoriesDrawer
        isOpen={isOpen}
        onClose={onClose}
        categories={incomeCategories}
        isLoading={incomeCategories === null}
        onAddCategory={addIncomeCategory}
        onChangeCategory={updateIncomeCategory}
        onDeleteCategory={deleteIncomeCategory}
      />
    </>
  );
}
