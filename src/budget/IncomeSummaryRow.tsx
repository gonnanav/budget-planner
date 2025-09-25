import { SummaryRow } from "./SummaryRow";

interface IncomeSummaryRowProps {
  value: string;
}

export function IncomeSummaryRow({ value }: IncomeSummaryRowProps) {
  return (
    <SummaryRow
      label="Total Income"
      value={value}
      backgroundColor="bg-emerald-50"
      valueColor="text-foreground"
    />
  );
}
