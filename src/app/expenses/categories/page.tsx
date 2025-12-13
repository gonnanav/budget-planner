"use client";

import {
  CategoriesScreen,
  useCategoriesScreen,
} from "@/components/categories-screen";
import { getExpenseItems } from "@/db/expenses/items";
import {
  getExpenseCategories,
  addExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
} from "@/db/expenses/categories";
import { drawer } from "@heroui/react";

export default function Page() {
  const { categories, drawer, draft, actions, changeView } =
    useCategoriesScreen({
      basePath: "/expenses",
      drawerHeadingTexts: {
        create: "Add Expense Category",
        edit: "Edit Expense Category",
      },
      db: {
        getItems: getExpenseItems,
        getCategories: getExpenseCategories,
        addCategory: addExpenseCategory,
        updateCategory: updateExpenseCategory,
        deleteCategory: deleteExpenseCategory,
      },
    });

  return (
    <CategoriesScreen
      headingText="Expense Categories"
      addButtonLabel="Add expense category"
      emptyItemsText="No expense categories yet"
      categories={categories}
      draft={draft.value}
      isDrawerOpen={drawer.isOpen}
      drawerHeadingText={drawer.headingText}
      onDraftChange={draft.update}
      onDrawerClose={drawer.close}
      onAddClick={actions.startCreatingCategory}
      onCategoryClick={actions.startEditingCategory}
      onSaveClick={actions.saveCategory}
      onDeleteClick={actions.deleteCategory}
      onViewChange={changeView}
    />
  );
}
