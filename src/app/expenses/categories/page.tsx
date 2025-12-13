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

export default function Page() {
  const {
    categories,
    draft,
    isDrawerOpen,
    drawerHeadingText,
    startCreatingCategory,
    startEditingCategory,
    saveCategory,
    deleteCategory,
    changeView,
    updateDraft,
    closeDrawer,
  } = useCategoriesScreen({
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
      draft={draft}
      isDrawerOpen={isDrawerOpen}
      drawerHeadingText={drawerHeadingText}
      onDraftChange={updateDraft}
      onDrawerClose={closeDrawer}
      onAddClick={startCreatingCategory}
      onCategoryClick={startEditingCategory}
      onSaveClick={saveCategory}
      onDeleteClick={deleteCategory}
      onViewChange={changeView}
    />
  );
}
