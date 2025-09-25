import { SummaryRow } from "./SummaryRow";

interface ExpensesSummaryRowProps {
  value: string;
  onClick?: () => void;
}

export function ExpensesSummaryRow({
  value,
  onClick,
}: ExpensesSummaryRowProps) {
  return (
    <SummaryRow
      label="Total Expenses"
      value={value}
      backgroundColor="bg-rose-50"
      valueColor="text-foreground"
      onClick={onClick}
    />
  );
}
