"use client";

import { BudgetScreen } from "components/BudgetScreen";
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
  const incomeItems = useLiveQuery(getIncomeItems);
  const expenseItems = useLiveQuery(getExpenseItems);
  const incomeCategories = useLiveQuery(getIncomeCategories);
  const expenseCategories = useLiveQuery(getExpenseCategories);

  return (
    <BudgetScreen
      income={{
        items: {
          data: incomeItems,
          add: addIncomeItem,
          update: updateIncomeItem,
          delete: deleteIncomeItem,
        },
        categories: {
          data: incomeCategories,
          add: addIncomeCategory,
          update: updateIncomeCategory,
          delete: deleteIncomeCategory,
        },
      }}
      expenses={{
        items: {
          data: expenseItems,
          add: addExpenseItem,
          update: updateExpenseItem,
          delete: deleteExpenseItem,
        },
        categories: {
          data: expenseCategories,
          add: addExpenseCategory,
          update: updateExpenseCategory,
          delete: deleteExpenseCategory,
        },
      }}
    />
  );
}
