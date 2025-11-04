import { BalanceBanner } from "./BalanceBanner";
import { BudgetCard } from "./BudgetCard";

interface OverviewScreenProps {
  income: string;
  expense: string;
  balance: string;
  balanceStatus: "balanced" | "surplus" | "deficit";
  incomeItemCount: number;
  incomeCategoryCount: number;
  expenseItemCount: number;
  expenseCategoryCount: number;
  onIncomeClick?: () => void;
  onExpenseClick?: () => void;
}

export function OverviewScreen({
  income,
  expense,
  balance,
  balanceStatus,
  incomeItemCount,
  incomeCategoryCount,
  expenseItemCount,
  expenseCategoryCount,
  onIncomeClick,
  onExpenseClick,
}: OverviewScreenProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Overview</h3>

      <BalanceBanner status={balanceStatus} amount={balance} />

      <div className="grid grid-cols-2 gap-3">
        <BudgetCard
          title="Income"
          amount={income}
          itemCount={incomeItemCount}
          categoryCount={incomeCategoryCount}
          variant="income"
          onClick={onIncomeClick}
        />

        <BudgetCard
          title="Expenses"
          amount={expense}
          itemCount={expenseItemCount}
          categoryCount={expenseCategoryCount}
          variant="expense"
          onClick={onExpenseClick}
        />
      </div>
    </div>
  );
}
