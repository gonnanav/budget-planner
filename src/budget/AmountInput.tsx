import { NumberInput } from "@heroui/number-input";

interface AmountInputProps {
  amount: number | null;
  className?: string;
  onChange: (amount: number | null) => void;
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

function toValue(amount: number | null): number {
  return amount ?? NaN;
}

function fromValue(value: number): number | null {
  return Number.isNaN(value) ? null : value;
}
