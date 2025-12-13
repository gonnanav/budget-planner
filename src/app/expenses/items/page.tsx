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
  const { data, drawer, draft, actions, changeView } = useItemsScreen({
    basePath: "/expenses",
    drawerHeadingTexts: {
      create: "Add Expense Item",
      edit: "Edit Expense Item",
    },
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
      headingText="Expense Items"
      addButtonLabel="Add expense item"
      emptyItemsText="No expense items yet"
      items={data.items}
      categoryOptions={data.categories}
      isDrawerOpen={drawer.isOpen}
      drawerHeadingText={drawer.headingText}
      draft={draft.value}
      onItemClick={actions.startEditingItem}
      onAddClick={actions.startCreatingItem}
      onDraftChange={draft.update}
      onDrawerClose={drawer.close}
      onSaveClick={actions.saveItem}
      onDeleteClick={actions.deleteItem}
      onViewChange={changeView}
    />
  );
}
