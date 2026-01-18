"use client";

import { BudgetScreen } from "components/BudgetScreen";
import { createCategory, enrichCategory } from "core/categories";
import { calculateBalance } from "core/balance";
import { createItem, enrichItem, sumItems } from "core/items";
import type {
  BudgetState,
  CategoryInput,
  ItemInput,
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

  const handleAddItem = (section: Section, input: ItemInput) => {
    const item = buildItem(crypto.randomUUID(), input);

    return section === "income" ? addIncomeItem(item) : addExpenseItem(item);
  };

  const handleUpdateItem = (section: Section, id: string, input: ItemInput) => {
    const item = buildItem(id, input);

    return section === "income"
      ? updateIncomeItem(item)
      : updateExpenseItem(item);
  };

  const handleDeleteItem = (section: Section, id: string) => {
    return section === "income" ? deleteIncomeItem(id) : deleteExpenseItem(id);
  };

  const handleAddCategory = (section: Section, input: CategoryInput) => {
    const category = buildCategory(crypto.randomUUID(), input);

    return section === "income"
      ? addIncomeCategory(category)
      : addExpenseCategory(category);
  };

  const handleUpdateCategory = (
    section: Section,
    id: string,
    input: CategoryInput,
  ) => {
    const category = buildCategory(id, input);

    return section === "income"
      ? updateIncomeCategory(category)
      : updateExpenseCategory(category);
  };

  const handleDeleteCategory = (section: Section, id: string) => {
    return section === "income"
      ? deleteIncomeCategory(id)
      : deleteExpenseCategory(id);
  };

  return (
    <BudgetScreen
      state={budgetState}
      actions={{
        item: {
          add: handleAddItem,
          update: handleUpdateItem,
          delete: handleDeleteItem,
        },
        category: {
          add: handleAddCategory,
          update: handleUpdateCategory,
          delete: handleDeleteCategory,
        },
      }}
    />
  );
}

function buildItem(id: string, input: ItemInput) {
  const { name, amount, frequency, categoryId, notes } = input;

  return createItem({ id, name, amount, frequency, categoryId, notes });
}

function buildCategory(id: string, input: CategoryInput) {
  const { name } = input;

  return createCategory({ id, name });
}
