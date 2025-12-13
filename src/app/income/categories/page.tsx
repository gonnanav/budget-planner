"use client";

import {
  CategoriesScreen,
  useCategoriesScreen,
} from "@/components/categories-screen";
import { getIncomeItems } from "@/db/income/items";
import {
  getIncomeCategories,
  addIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
} from "@/db/income/categories";

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
    basePath: "/income",
    drawerHeadingTexts: {
      create: "Add Income Category",
      edit: "Edit Income Category",
    },
    db: {
      getItems: getIncomeItems,
      getCategories: getIncomeCategories,
      addCategory: addIncomeCategory,
      updateCategory: updateIncomeCategory,
      deleteCategory: deleteIncomeCategory,
    },
  });

  return (
    <CategoriesScreen
      headingText="Income Categories"
      addButtonLabel="Add income category"
      emptyItemsText="No income categories yet"
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
