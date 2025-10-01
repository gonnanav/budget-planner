import { NumberInput } from "@heroui/number-input";
import { BudgetEntryAmount } from "@/core/types";

interface AmountInputProps {
  amount: number | null;
  className?: string;
  onChange: (amount: BudgetEntryAmount | null) => void;
}

export function AmountInput({ amount, className, onChange }: AmountInputProps) {
  const handleChange = (value: number) => {
    onChange(fromValue(value));
  };

  return (
    <NumberInput
      label="Amount"
      minValue={0}
      defaultValue={0}
      value={toValue(amount)}
      className={className}
      onValueChange={handleChange}
    />
  );
}

function toValue(amount: BudgetEntryAmount): number {
  return amount ?? NaN;
}

function fromValue(value: number): BudgetEntryAmount {
  return Number.isNaN(value) ? null : value;
}
