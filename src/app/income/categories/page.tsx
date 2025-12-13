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
  const { categories, drawer, draft, actions, changeView } =
    useCategoriesScreen({
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
