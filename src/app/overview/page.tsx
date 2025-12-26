"use client";

import { OverviewScreen } from "@/components/overview";
import { getIncomeItems } from "@/db/income/items";
import { getExpenseItems } from "@/db/expenses/items";
import { calculateBalance } from "@/core/balance";
import { formatAmount } from "@/lib/format";
import { useLiveQuery } from "dexie-react-hooks";

export default function Page() {
  const incomeItems = useLiveQuery(getIncomeItems);
  const expenseItems = useLiveQuery(getExpenseItems);

  const { incomeSum, expenseSum, balance, status } = calculateBalance(
    incomeItems ?? [],
    expenseItems ?? [],
  );

  const formattedIncomeSum = formatAmount(incomeSum);
  const formattedExpenseSum = formatAmount(expenseSum);
  const formattedBalance = formatAmount(Math.abs(balance));

  return (
    <OverviewScreen
      incomeSum={formattedIncomeSum}
      expenseSum={formattedExpenseSum}
      balance={{
        amount: formattedBalance,
        status,
      }}
    />
  );
}
