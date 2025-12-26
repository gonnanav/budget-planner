import Link from "next/link";
import { BalanceBanner } from "./BalanceBanner";
import { BudgetCard } from "./BudgetCard";
import { OverviewLayout } from "./OverviewLayout";
import { BalanceStatus } from "@/core/types";

interface OverviewScreenProps {
  incomeSum: string;
  expenseSum: string;
  balance: {
    amount: string;
    status: BalanceStatus;
  };
}

export function OverviewScreen({
  incomeSum,
  expenseSum,
  balance,
}: OverviewScreenProps) {
  return (
    <OverviewLayout
      banner={<BalanceBanner status={balance.status} amount={balance.amount} />}
      cards={
        <>
          <Link href="/income/items">
            <BudgetCard title="Income" amount={incomeSum} variant="income" />
          </Link>

          <Link href="/expenses/items">
            <BudgetCard
              title="Expenses"
              amount={expenseSum}
              variant="expense"
            />
          </Link>
        </>
      }
    />
  );
}
