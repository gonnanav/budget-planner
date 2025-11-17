"use client";

import { useRouter } from "next/navigation";
import { budgetBalance } from "@/core/budget-balance";
import { OverviewScreen } from "@/components/overview";
import { formatAmount } from "@/lib/format";
import { useTableItems } from "@/db";

export default function Page() {
  const router = useRouter();
  const { items: incomeItems } = useTableItems("incomes");
  const { items: expenseItems } = useTableItems("expenses");

  const { incomeSum, expenseSum, balance, status } = budgetBalance(
    incomeItems,
    expenseItems,
  );

  const formattedIncome = formatAmount(incomeSum);
  const formattedExpense = formatAmount(expenseSum);
  const formattedBalance = formatAmount(Math.abs(balance));

  const balanceStatus =
    status === "balanced"
      ? "balanced"
      : status === "positive"
        ? "surplus"
        : "deficit";

  const uniqueIncomeCategories = new Set(
    incomeItems.map((item) => item.categoryId).filter(Boolean),
  ).size;

  const uniqueExpenseCategories = new Set(
    expenseItems.map((item) => item.categoryId).filter(Boolean),
  ).size;

  return (
    <OverviewScreen
      income={formattedIncome}
      expense={formattedExpense}
      balance={formattedBalance}
      balanceStatus={balanceStatus}
      incomeItemCount={incomeItems.length}
      incomeCategoryCount={uniqueIncomeCategories}
      expenseItemCount={expenseItems.length}
      expenseCategoryCount={uniqueExpenseCategories}
      onIncomeClick={() => router.push("/income")}
      onExpenseClick={() => router.push("/expenses")}
    />
  );
}
