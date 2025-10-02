import { NumberInput } from "@heroui/number-input";
import { BudgetEntryAmount } from "@/core/types";

interface AmountInputProps {
  amount: number | null;
  onChange: (amount: BudgetEntryAmount | null) => void;
}

export function AmountInput({ amount, onChange }: AmountInputProps) {
  const handleChange = (value: number) => {
    onChange(fromValue(value));
  };

  return (
    <NumberInput
      label="Amount"
      formatOptions={{ style: "currency", currency: "ILS" }}
      minValue={0}
      value={toValue(amount)}
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
