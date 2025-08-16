import { cn } from "@/lib/utils";

export interface AmountInputProps {
  id: string;
  label: string;
  amount: number;
  className?: string;
  onChange: (newAmount: number) => void;
}

export function AmountInput({
  id,
  label,
  amount,
  className,
  onChange,
}: AmountInputProps) {
  const value = amount.toString();

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground/80">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="number"
        inputMode="numeric"
        min={0}
        step="1"
        placeholder="0"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className={cn(
          "w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground",
          "placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/50"
        )}
      />
    </div>
  );
}
