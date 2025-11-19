import { BackupData } from "@/lib/backup-restore";
import { BalanceBanner } from "./BalanceBanner";
import { BudgetCard } from "./BudgetCard";
import { AppLayout } from "@/components/app-layout";
import { budgetBalance } from "@/core/budget-balance";
import { formatAmount } from "@/lib/format";
import { BudgetItem } from "@/core/types";

interface OverviewScreenProps {
  incomeItems: BudgetItem[];
  expenseItems: BudgetItem[];
  onIncomeClick: () => void;
  onExpenseClick: () => void;
  onBackup: () => Promise<void>;
  onRestore: (data: BackupData) => Promise<void>;
}

export function OverviewScreen({
  incomeItems,
  expenseItems,
  onIncomeClick,
  onExpenseClick,
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
    <AppLayout selectedTab="overview" onBackup={onBackup} onRestore={onRestore}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Overview</h3>

        <BalanceBanner status={balanceStatus} amount={formattedBalance} />

        <div className="grid grid-cols-2 gap-3">
          <BudgetCard
            title="Income"
            amount={formattedIncome}
            itemCount={incomeItems.length}
            categoryCount={uniqueIncomeCategories}
            variant="income"
            onClick={onIncomeClick}
          />

          <BudgetCard
            title="Expenses"
            amount={formattedExpense}
            itemCount={expenseItems.length}
            categoryCount={uniqueExpenseCategories}
            variant="expense"
            onClick={onExpenseClick}
          />
        </div>
      </div>
    </AppLayout>
  );
}
