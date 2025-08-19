import { Input } from "@heroui/input";

interface AmountInputProps {
  id: string;
  label: string;
  amount: number;
  onChange: (amount: number) => void;
}

export function AmountInput({ id, label, amount, onChange }: AmountInputProps) {
  const value = fromAmount(amount);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(toAmount(e.target.value));
  };

  return (
    <Input
      id={id}
      name={id}
      label={label}
      type="number"
      inputMode="numeric"
      min={0}
      value={value}
      onChange={handleChange}
    />
  );
}

function fromAmount(amount: number): string {
  return amount.toString();
}

function toAmount(value: string): number {
  return Number(value) || 0;
}
