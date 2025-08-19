import { NumberInput } from "@heroui/number-input";

interface AmountInputProps {
  label: string;
  amount: number;
  onChange: (amount: number) => void;
}

export function AmountInput({ label, amount, onChange }: AmountInputProps) {
  return (
    <NumberInput
      label={label}
      minValue={0}
      defaultValue={0}
      value={amount}
      onValueChange={onChange}
    />
  );
}
