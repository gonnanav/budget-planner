"use client";

import { useContext } from "react";
import { budgetBalance } from "@/core/budget-balance";
import { IncomeContext } from "@/contexts/IncomeContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { OverviewScreen } from "@/components/overview";
import { formatAmount } from "@/lib/format";

export default function Page() {
  const { incomes } = useContext(IncomeContext);
  const { expenses } = useContext(ExpenseContext);

  const { incomeSum, expenseSum, balance, status } = budgetBalance(
    incomes,
    expenses,
  );

  const formattedIncome = formatAmount(incomeSum);
  const formattedExpense = formatAmount(expenseSum);
  const formattedBalance = formatAmount(balance);
  const isGood = status !== "negative";

  return (
    <OverviewScreen
      income={formattedIncome}
      expense={formattedExpense}
      balance={formattedBalance}
      isGood={isGood}
    />
  );
}
