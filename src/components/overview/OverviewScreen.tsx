import Link from "next/link";
import { BackupData } from "@/lib/backup-restore";
import { BalanceBanner } from "./BalanceBanner";
import { BudgetCard } from "./BudgetCard";
import { OverviewLayout } from "./OverviewLayout";
import { Heading } from "@/components/shared/Heading";
import { calculateBalance } from "@/core/balance";
import { formatAmount } from "@/lib/format";
import { BudgetItem } from "@/core/types";

interface OverviewScreenProps {
  incomeItems: BudgetItem[];
  expenseItems: BudgetItem[];
  backup: () => Promise<void>;
  restore: (data: BackupData) => Promise<void>;
}

export function OverviewScreen({
  incomeItems,
  expenseItems,
  backup,
  restore,
}: OverviewScreenProps) {
  const { incomeSum, expenseSum, balance, status } = calculateBalance(
    incomeItems,
    expenseItems,
  );

  const formattedIncome = formatAmount(incomeSum);
  const formattedExpense = formatAmount(expenseSum);
  const formattedBalance = formatAmount(Math.abs(balance));

  const uniqueIncomeCategories = new Set(
    incomeItems.map((item) => item.categoryId).filter(Boolean),
  ).size;

  const uniqueExpenseCategories = new Set(
    expenseItems.map((item) => item.categoryId).filter(Boolean),
  ).size;

  return (
    <OverviewLayout
      heading={<Heading>Overview</Heading>}
      onBackup={backup}
      onRestore={restore}
      banner={<BalanceBanner status={status} amount={formattedBalance} />}
      cards={
        <>
          <Link href="/income">
            <BudgetCard
              title="Income"
              amount={formattedIncome}
              itemCount={incomeItems.length}
              categoryCount={uniqueIncomeCategories}
              variant="income"
            />
          </Link>

          <Link href="/expenses">
            <BudgetCard
              title="Expenses"
              amount={formattedExpense}
              itemCount={expenseItems.length}
              categoryCount={uniqueExpenseCategories}
              variant="expense"
            />
          </Link>
        </>
      }
    />
  );
}
