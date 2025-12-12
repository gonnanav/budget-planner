"use client";

import { OverviewScreen } from "@/components/overview";
import { getIncomeItems } from "@/db/income/items";
import { getExpenseItems } from "@/db/expenses/items";
import { getIncomeCategories } from "@/db/income/categories";
import { getExpenseCategories } from "@/db/expenses/categories";
import { calculateBalance } from "@/core/balance";
import { formatAmount } from "@/lib/format";
import { useLiveQuery } from "dexie-react-hooks";

export default function Page() {
  const incomeItems = useLiveQuery(getIncomeItems);
  const expenseItems = useLiveQuery(getExpenseItems);
  const incomeCategories = useLiveQuery(getIncomeCategories);
  const expenseCategories = useLiveQuery(getExpenseCategories);

  const { incomeSum, expenseSum, balance, status } = calculateBalance(
    incomeItems ?? [],
    expenseItems ?? [],
  );

  const formattedIncomeSum = formatAmount(incomeSum);
  const formattedExpenseSum = formatAmount(expenseSum);
  const formattedBalance = formatAmount(Math.abs(balance));

  const incomeItemCount = incomeItems?.length ?? 0;
  const expenseItemCount = expenseItems?.length ?? 0;

  const incomeCategoryCount = incomeCategories?.length ?? 0;
  const expenseCategoryCount = expenseCategories?.length ?? 0;

  return (
    <OverviewScreen
      income={{
        itemCount: incomeItemCount,
        categoryCount: incomeCategoryCount,
        sum: formattedIncomeSum,
      }}
      expense={{
        itemCount: expenseItemCount,
        categoryCount: expenseCategoryCount,
        sum: formattedExpenseSum,
      }}
      balance={{
        amount: formattedBalance,
        status,
      }}
    />
  );
}
