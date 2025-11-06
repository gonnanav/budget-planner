"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { budgetBalance } from "@/core/budget-balance";
import { IncomeContext } from "@/contexts/IncomeContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { OverviewScreen } from "@/components/overview";
import { formatAmount } from "@/lib/format";

export default function Page() {
  const router = useRouter();
  const { incomes } = useContext(IncomeContext);
  const { items: expenses } = useContext(ExpenseContext);

  const { incomeSum, expenseSum, balance, status } = budgetBalance(
    incomes,
    expenses,
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
    incomes.map((item) => item.categoryId).filter(Boolean),
  ).size;

  const uniqueExpenseCategories = new Set(
    expenses.map((item) => item.categoryId).filter(Boolean),
  ).size;

  return (
    <OverviewScreen
      income={formattedIncome}
      expense={formattedExpense}
      balance={formattedBalance}
      balanceStatus={balanceStatus}
      incomeItemCount={incomes.length}
      incomeCategoryCount={uniqueIncomeCategories}
      expenseItemCount={expenses.length}
      expenseCategoryCount={uniqueExpenseCategories}
      onIncomeClick={() => router.push("/income")}
      onExpenseClick={() => router.push("/expenses")}
    />
  );
}
