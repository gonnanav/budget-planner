import Link from "next/link";
import { BalanceBanner } from "./BalanceBanner";
import { BudgetCard } from "./BudgetCard";
import { OverviewLayout } from "./OverviewLayout";
import { Heading } from "@/components/shared/Heading";
import { BalanceStatus } from "@/core/types";

interface OverviewScreenProps {
  income: {
    itemCount: number;
    categoryCount: number;
    sum: string;
  };
  expense: {
    itemCount: number;
    categoryCount: number;
    sum: string;
  };
  balance: {
    amount: string;
    status: BalanceStatus;
  };
}

export function OverviewScreen({
  income,
  expense,
  balance,
}: OverviewScreenProps) {
  return (
    <OverviewLayout
      heading={<Heading>Overview</Heading>}
      banner={<BalanceBanner status={balance.status} amount={balance.amount} />}
      cards={
        <>
          <Link href="/income">
            <BudgetCard
              title="Income"
              amount={income.sum}
              itemCount={income.itemCount}
              categoryCount={income.categoryCount}
              variant="income"
            />
          </Link>

          <Link href="/expenses">
            <BudgetCard
              title="Expenses"
              amount={expense.sum}
              itemCount={expense.itemCount}
              categoryCount={expense.categoryCount}
              variant="expense"
            />
          </Link>
        </>
      }
    />
  );
}
