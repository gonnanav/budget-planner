import { NumberInput } from "@heroui/number-input";

interface AmountInputProps {
  label: string;
  amount: number;
  className?: string;
  onChange: (amount: number) => void;
}

export function AmountInput({
  label,
  amount,
  className,
  onChange,
}: AmountInputProps) {
  const handleChange = (value: number) => {
    const normalizedValue = Number.isNaN(value) ? 0 : value;
    onChange(normalizedValue);
  };

  return (
    <NumberInput
      label={label}
      minValue={0}
      defaultValue={0}
      value={amount}
      className={className}
      onValueChange={handleChange}
    />
  );
}
