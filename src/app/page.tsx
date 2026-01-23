"use client";

import { BudgetScreen } from "components/BudgetScreen";
import { createCategory, enrichCategory } from "core/categories";
import { calculateBalance } from "core/balance";
import { createItem, enrichItem, sumItems } from "core/items";
import type {
  BudgetState,
  CategoryInput,
  CategoryDraft,
  ItemInput,
  ItemDraft,
  Section,
} from "core/types";
import {
  addIncomeItem,
  deleteIncomeItem,
  getIncomeItems,
  updateIncomeItem,
} from "db/income/items";
import {
  addIncomeCategory,
  deleteIncomeCategory,
  getIncomeCategories,
  updateIncomeCategory,
} from "db/income/categories";
import {
  addExpenseItem,
  deleteExpenseItem,
  getExpenseItems,
  updateExpenseItem,
} from "db/expenses/items";
import {
  addExpenseCategory,
  deleteExpenseCategory,
  getExpenseCategories,
  updateExpenseCategory,
} from "db/expenses/categories";
import { useLiveQuery } from "dexie-react-hooks";

export default function Page() {
  const incomeItemsRaw = useLiveQuery(getIncomeItems);
  const incomeItemsReady = incomeItemsRaw !== undefined;
  const incomeItems = incomeItemsReady ? incomeItemsRaw.map(enrichItem) : [];
  const incomeCategoriesRaw = useLiveQuery(getIncomeCategories);
  const incomeCategoriesReady =
    incomeCategoriesRaw !== undefined && incomeItemsReady;
  const incomeCategories = incomeCategoriesReady
    ? incomeCategoriesRaw.map((category) =>
        enrichCategory(category, incomeItems),
      )
    : [];

  const expenseItemsRaw = useLiveQuery(getExpenseItems);
  const expenseItemsReady = expenseItemsRaw !== undefined;
  const expenseItems = expenseItemsReady ? expenseItemsRaw.map(enrichItem) : [];
  const expenseCategoriesRaw = useLiveQuery(getExpenseCategories);
  const expenseCategoriesReady =
    expenseCategoriesRaw !== undefined && expenseItemsReady;
  const expenseCategories = expenseCategoriesReady
    ? expenseCategoriesRaw.map((category) =>
        enrichCategory(category, expenseItems),
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
    const { section } = input;
    const item = buildItem(crypto.randomUUID(), input);

    if (section === "income") {
      await addIncomeItem(item);
    } else {
      await addExpenseItem(item);
    }
  };

  const handleUpdateItem = async (id: string, input: ItemInput) => {
    const { section } = input;
    const item = buildItem(id, input);

    if (section === "income") {
      await updateIncomeItem(item);
    } else {
      await updateExpenseItem(item);
    }
  };

  const handleDeleteItem = async (id: string, section: Section) => {
    if (section === "income") {
      await deleteIncomeItem(id);
    } else {
      await deleteExpenseItem(id);
    }
  };

  const handleAddCategory = async (input: CategoryInput) => {
    const { section } = input;
    const category = buildCategory(crypto.randomUUID(), input);

    if (section === "income") {
      await addIncomeCategory(category);
    } else {
      await addExpenseCategory(category);
    }
  };

  const handleUpdateCategory = async (id: string, input: CategoryInput) => {
    const { section } = input;
    const category = buildCategory(id, input);

    if (section === "income") {
      await updateIncomeCategory(category);
    } else {
      await updateExpenseCategory(category);
    }
  };

  const handleDeleteCategory = async (id: string, section: Section) => {
    if (section === "income") {
      await deleteIncomeCategory(id);
    } else {
      await deleteExpenseCategory(id);
    }
  };

  return (
    <BudgetScreen
      state={budgetState}
      actions={{
        item: {
          onAdd: handleAddItem,
          onUpdate: handleUpdateItem,
          onDelete: handleDeleteItem,
        },
        category: {
          onAdd: handleAddCategory,
          onUpdate: handleUpdateCategory,
          onDelete: handleDeleteCategory,
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
