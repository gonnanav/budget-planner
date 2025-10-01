import { SummaryRow } from "./SummaryRow";

interface IncomeSummaryRowProps {
  value: string;
  onClick?: () => void;
}

export function IncomeSummaryRow({ value, onClick }: IncomeSummaryRowProps) {
  return (
    <SummaryRow
      label="Total Income"
      value={value}
      backgroundColor="bg-emerald-50"
      valueColor="text-foreground"
      onClick={onClick}
    />
  );
}
