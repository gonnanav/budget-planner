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
    basePath: "/income",
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
