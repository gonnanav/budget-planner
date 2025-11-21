import Link from "next/link";
import { BackupData } from "@/lib/backup-restore";
import { BalanceBanner } from "./BalanceBanner";
import { BudgetCard } from "./BudgetCard";
import { OverviewLayout } from "./OverviewLayout";
import { Heading } from "@/components/shared/Heading";
import { budgetBalance } from "@/core/budget-balance";
import { formatAmount } from "@/lib/format";
import { BudgetItem } from "@/core/types";

interface OverviewScreenProps {
  incomeItems: BudgetItem[];
  expenseItems: BudgetItem[];
  onBackup: () => Promise<void>;
  onRestore: (data: BackupData) => Promise<void>;
}

export function OverviewScreen({
  incomeItems,
  expenseItems,
  onBackup,
  onRestore,
}: OverviewScreenProps) {
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
    <OverviewLayout
      heading={<Heading>Overview</Heading>}
      onBackup={onBackup}
      onRestore={onRestore}
      banner={
        <BalanceBanner status={balanceStatus} amount={formattedBalance} />
      }
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
