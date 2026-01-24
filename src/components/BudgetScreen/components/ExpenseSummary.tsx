import { SectionSummary } from "./SectionSummary/SectionSummary";

interface ExpenseSummaryProps {
    amount: number;
    isActive?: boolean;
    onClick?: () => void;
}

export function ExpenseSummary({
    amount,
    isActive,
    onClick,
}: ExpenseSummaryProps) {
    return (
        <SectionSummary
            title="Expenses"
            amount={amount}
            variant="expense"
            isActive={isActive}
            onClick={onClick}
        />
    );
}
