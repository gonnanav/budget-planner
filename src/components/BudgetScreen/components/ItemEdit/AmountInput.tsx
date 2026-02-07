import { NumberInput } from "@mantine/core";

interface AmountInputProps {
  amount: number | null;
  onAmountChange: (amount: number | null) => void;
}

export function AmountInput({ amount, onAmountChange }: AmountInputProps) {
  const value = toValue(amount);

  const handleChange = (value: string | number) => {
    onAmountChange(fromValue(value));
  };

  return (
    <NumberInput
      label="Amount"
      prefix="₪ "
      thousandSeparator=","
      min={0}
      value={value}
      onChange={handleChange}
    />
  );
}

function toValue(amount: number | null): number | string {
  return amount ?? "";
}

function fromValue(value: string | number): number | null {
  if (typeof value === "string") return null;

  return value;
}
