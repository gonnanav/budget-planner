import { cn } from "@/lib/utils";
import { evaluateBudget } from "./budget";

export interface BalanceProps {
  incomes: number;
  expenses: number;
}

export function Balance({ incomes, expenses }: BalanceProps) {
  const { balance, status } = evaluateBudget(incomes, expenses);
  const isGreen = status !== 'negative';
  const formatted = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "ILS",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(balance);

  return (
    <div className="flex flex-wrap items-baseline justify-between">
      <span className="text-lg font-semibold">Balance</span>
      <span
        className={cn(
          "text-lg font-semibold",
          isGreen ? "text-emerald-600" : "text-rose-600"
        )}
        aria-live="polite"
      >
        {formatted}
      </span>
    </div>
  );
}
