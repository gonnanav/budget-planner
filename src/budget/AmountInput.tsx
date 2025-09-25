import { NumberInput } from "@heroui/number-input";

interface AmountInputProps {
  label: string;
  amount: number | null;
  className?: string;
  onChange: (amount: number | null) => void;
}

export function AmountInput({
  label,
  amount,
  className,
  onChange,
}: AmountInputProps) {
  const handleChange = (value: number) => {
    onChange(fromValue(value));
  };

  return (
    <NumberInput
      label={label}
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
