import { SummaryRow } from "./SummaryRow";
import { IncomeSummaryRow } from "./IncomeSummaryRow";
import { ExpensesSummaryRow } from "./ExpensesSummaryRow";

interface OverviewScreenProps {
  income: string;
  expense: string;
  balance: string;
  isGood: boolean;
}

export function OverviewScreen({
  income,
  expense,
  balance,
  isGood,
}: OverviewScreenProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Overview</h3>
      <div className="space-y-1">
        <IncomeSummaryRow value={income} />
        <ExpensesSummaryRow value={expense} />

        <SummaryRow
          label="Balance"
          value={balance}
          backgroundColor="bg-slate-50"
          valueColor={isGood ? "text-emerald-600" : "text-rose-600"}
          isBold={true}
        />
      </div>
    </div>
  );
}
