import { SectionSummary } from "./SectionSummary/SectionSummary";

interface IncomeSummaryProps {
  amount: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function IncomeSummary({
  amount,
  isActive,
  onClick,
}: IncomeSummaryProps) {
  return (
    <SectionSummary
      title="Income"
      amount={amount}
      variant="income"
      isActive={isActive}
      onClick={onClick}
    />
  );
}
