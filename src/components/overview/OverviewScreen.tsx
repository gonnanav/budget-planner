import { BalanceBanner } from "./BalanceBanner";
import { SectionSummary } from "./SectionSummary";
import { OverviewLayout } from "./OverviewLayout";
import { BalanceStatus } from "core/types";

interface OverviewScreenProps {
  incomeSum: string;
  expenseSum: string;
  balance: {
    amount: string;
    status: BalanceStatus;
  };
  activeSection: "income" | "expenses" | null;
  onIncomeClick: () => void;
  onExpensesClick: () => void;
}

export function OverviewScreen({
  incomeSum,
  expenseSum,
  balance,
  activeSection,
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
            isActive={activeSection === "income"}
            onClick={onIncomeClick}
          />
          <SectionSummary
            title="Expenses"
            amount={expenseSum}
            variant="expense"
            isActive={activeSection === "expenses"}
            onClick={onExpensesClick}
          />
        </>
      }
    />
  );
}
