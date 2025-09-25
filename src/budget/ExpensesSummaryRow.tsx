import { SummaryRow } from "./SummaryRow";

interface ExpensesSummaryRowProps {
  value: string;
}

export function ExpensesSummaryRow({ value }: ExpensesSummaryRowProps) {
  return (
    <SummaryRow
      label="Total Expenses"
      value={value}
      backgroundColor="bg-rose-50"
      valueColor="text-foreground"
    />
  );
}
