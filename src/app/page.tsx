"use client";

import { BudgetScreen } from "components/BudgetScreen";
import { createCategory, createCategorySummary } from "core/categories";
import { calculateBalance } from "core/balance";
import { createItem, enrichItem, sumItems } from "core/items";
import type { BudgetState, CategoryInput, ItemInput } from "core/types";
import { useItems, addItem, updateItem, deleteItem } from "db/items";
import {
  useCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "db/categories";

export default function Page() {
  const incomeItemsRaw = useItems("income");
  const incomeItemsReady = incomeItemsRaw !== undefined;
  const incomeItems = incomeItemsReady ? incomeItemsRaw.map(enrichItem) : [];
  const incomeCategoriesRaw = useCategories("income");
  const incomeCategoriesReady =
    incomeCategoriesRaw !== undefined && incomeItemsReady;
  const incomeCategories = incomeCategoriesReady
    ? incomeCategoriesRaw.map((category) =>
        createCategorySummary(category, incomeItems),
      )
    : [];

  const expenseItemsRaw = useItems("expenses");
  const expenseItemsReady = expenseItemsRaw !== undefined;
  const expenseItems = expenseItemsReady ? expenseItemsRaw.map(enrichItem) : [];
  const expenseCategoriesRaw = useCategories("expenses");
  const expenseCategoriesReady =
    expenseCategoriesRaw !== undefined && expenseItemsReady;
  const expenseCategories = expenseCategoriesReady
    ? expenseCategoriesRaw.map((category) =>
        createCategorySummary(category, expenseItems),
      )
    : [];

  const balanceReady = incomeItemsReady && expenseItemsReady;
  const balanceData = balanceReady
    ? calculateBalance(incomeItems, expenseItems)
    : null;
  const incomeSum = incomeItemsReady ? sumItems(incomeItems) : 0;
  const expenseSum = expenseItemsReady ? sumItems(expenseItems) : 0;

  const budgetState: BudgetState = {
    income: {
      items: {
        data: incomeItems,
        isLoading: !incomeItemsReady,
      },
      categories: {
        data: incomeCategories,
        isLoading: !incomeCategoriesReady,
      },
      sum: {
        data: incomeSum,
        isLoading: !incomeItemsReady,
      },
    },
    expenses: {
      items: {
        data: expenseItems,
        isLoading: !expenseItemsReady,
      },
      categories: {
        data: expenseCategories,
        isLoading: !expenseCategoriesReady,
      },
      sum: {
        data: expenseSum,
        isLoading: !expenseItemsReady,
      },
    },
    balance: {
      data: balanceData
        ? { status: balanceData.status, delta: balanceData.balance }
        : { status: "balanced", delta: 0 },
      isLoading: !balanceReady,
    },
  };

  const handleAddItem = async (input: ItemInput) => {
    const item = buildItem(crypto.randomUUID(), input);
    await addItem(item);
  };

  const handleUpdateItem = async (id: string, input: ItemInput) => {
    const item = buildItem(id, input);
    await updateItem(item);
  };

  const handleAddCategory = async (input: CategoryInput) => {
    const category = buildCategory(crypto.randomUUID(), input);
    await addCategory(category);
  };

  const handleUpdateCategory = async (id: string, input: CategoryInput) => {
    const category = buildCategory(id, input);
    await updateCategory(category);
  };

  return (
    <BudgetScreen
      state={budgetState}
      actions={{
        item: {
          onAdd: handleAddItem,
          onUpdate: handleUpdateItem,
          onDelete: deleteItem,
        },
        category: {
          onAdd: handleAddCategory,
          onUpdate: handleUpdateCategory,
          onDelete: deleteCategory,
        },
      }}
    />
  );
}

function buildItem(id: string, input: ItemInput) {
  const { name, amount, frequency, categoryId, notes, section } = input;

  return createItem({
    id,
    name,
    amount,
    frequency,
    categoryId,
    notes,
    section,
  });
}

function buildCategory(id: string, input: CategoryInput) {
  const { name, section } = input;

  return createCategory({ id, name, section });
}
