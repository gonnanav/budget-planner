"use client";

import { ItemsScreen, useItemsScreen } from "@/components/items-screen";
import {
  getIncomeItems,
  addIncomeItem,
  updateIncomeItem,
  deleteIncomeItem,
} from "@/db/income/items";
import { getIncomeCategories } from "@/db/income/categories";

export default function Page() {
  const { data, drawer, draft, actions, changeView } = useItemsScreen({
    basePath: "/income",
    drawerHeadingTexts: {
      create: "Add Income Item",
      edit: "Edit Income Item",
    },
    db: {
      getItems: getIncomeItems,
      addItem: addIncomeItem,
      updateItem: updateIncomeItem,
      deleteItem: deleteIncomeItem,
      getCategories: getIncomeCategories,
    },
  });

  return (
    <ItemsScreen
      headingText="Income"
      addButtonLabel="Add income item"
      emptyItemsText="No income items yet"
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
