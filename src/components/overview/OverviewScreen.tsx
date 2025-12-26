import { BalanceBanner } from "./BalanceBanner";
import { SectionSummary } from "./SectionSummary";
import { OverviewLayout } from "./OverviewLayout";
import { BalanceStatus } from "@/core/types";

interface OverviewScreenProps {
  incomeSum: string;
  expenseSum: string;
  balance: {
    amount: string;
    status: BalanceStatus;
  };
  onIncomeClick: () => void;
  onExpensesClick: () => void;
}

export function OverviewScreen({
  incomeSum,
  expenseSum,
  balance,
  onIncomeClick,
  onExpensesClick,
}: OverviewScreenProps) {
  return (
    <OverviewLayout
      banner={<BalanceBanner status={balance.status} amount={balance.amount} />}
      cards={
        <>
          <SectionSummary
            title="Income"
            amount={incomeSum}
            variant="income"
            onClick={onIncomeClick}
          />
          <SectionSummary
            title="Expenses"
            amount={expenseSum}
            variant="expense"
            onClick={onExpensesClick}
          />
        </>
      }
    />
  );
}
