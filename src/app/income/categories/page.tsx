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
    startCreatingCategory: handleAddCategoryClick,
    startEditingCategory: handleCategoryClick,
    saveCategory: handleSaveCategoryClick,
    deleteCategory: handleDeleteCategoryClick,
    changeView: handleViewChange,
    updateDraft,
    closeDrawer,
  } = useCategoriesScreen({
    basePath: "/income",
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
      headingText="Income"
      categories={categories}
      draft={draft}
      isDrawerOpen={isDrawerOpen}
      drawerHeadingText={drawerHeadingText}
      onDraftChange={updateDraft}
      onDrawerClose={closeDrawer}
      onAddClick={handleAddCategoryClick}
      onCategoryClick={handleCategoryClick}
      onSaveClick={handleSaveCategoryClick}
      onDeleteClick={handleDeleteCategoryClick}
      onViewChange={handleViewChange}
    />
  );
}
