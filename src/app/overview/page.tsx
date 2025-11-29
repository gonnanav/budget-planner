"use client";

import { OverviewScreen } from "@/components/overview";
import { useIncomeItems } from "@/db/income/items";
import { useExpenseItems } from "@/db/expenses/items";
import { useIncomeCategories } from "@/db/income/categories";
import { useExpenseCategories } from "@/db/expenses/categories";
import { calculateBalance } from "@/core/balance";
import { formatAmount } from "@/lib/format";

export default function Page() {
  const incomeItems = useIncomeItems();
  const expenseItems = useExpenseItems();
  const incomeCategories = useIncomeCategories();
  const expenseCategories = useExpenseCategories();

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
