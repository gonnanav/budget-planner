"use client";

import { ItemsScreen, useItemsScreen } from "@/components/items-screen";
import {
  getExpenseItems,
  addExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
} from "@/db/expenses/items";
import { getExpenseCategories } from "@/db/expenses/categories";

export default function Page() {
  const {
    items,
    categoryOptions,
    isDrawerOpen,
    drawerHeadingText,
    draft,
    startEditingItem,
    startCreatingItem,
    updateDraft,
    closeDrawer,
    saveItem,
    deleteItem,
    changeView,
  } = useItemsScreen({
    basePath: "/expenses",
    db: {
      getItems: getExpenseItems,
      addItem: addExpenseItem,
      updateItem: updateExpenseItem,
      deleteItem: deleteExpenseItem,
      getCategories: getExpenseCategories,
    },
  });

  return (
    <ItemsScreen
      headingText="Expenses"
      items={items}
      categoryOptions={categoryOptions}
      isDrawerOpen={isDrawerOpen}
      drawerHeadingText={drawerHeadingText}
      draft={draft}
      onItemClick={startEditingItem}
      onAddClick={startCreatingItem}
      onDraftChange={updateDraft}
      onDrawerClose={closeDrawer}
      onSaveClick={saveItem}
      onDeleteClick={deleteItem}
      onViewChange={changeView}
    />
  );
}
