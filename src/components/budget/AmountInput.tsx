import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type="number"
        inputMode="numeric"
        min={0}
        step={100}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

function fromAmount(amount: number): string {
  return amount.toString();
}

function toAmount(value: string): number {
  return Number(value) || 0;
}
