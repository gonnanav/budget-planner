import { NumberInput } from "@heroui/number-input";

interface AmountInputProps {
  amount: number | null;
  onAmountChange: (amount: number | null) => void;
}

export function AmountInput({ amount, onAmountChange }: AmountInputProps) {
  const value = toValue(amount);

  const handleChange = (value: number) => {
    onAmountChange(fromValue(value));
  };

  return (
    <NumberInput
      label="Amount"
      formatOptions={{ style: "currency", currency: "ILS" }}
      minValue={0}
      value={value}
      onValueChange={handleChange}
    />
  );
}

function toValue(amount: number | null): number {
  return amount ?? NaN;
}

function fromValue(value: number): number | null {
  return Number.isNaN(value) ? null : value;
}
