import Link from "next/link";
import { BackupData } from "@/lib/backup-restore";
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
  backupActions: {
    backup: () => Promise<void>;
    restore: (data: BackupData) => Promise<void>;
  };
}

export function OverviewScreen({
  income,
  expense,
  balance,
  backupActions,
}: OverviewScreenProps) {
  return (
    <OverviewLayout
      heading={<Heading>Overview</Heading>}
      onBackup={backupActions.backup}
      onRestore={backupActions.restore}
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
