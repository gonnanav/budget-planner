import { cn } from "@/lib/utils";
import { BudgetEvaluation, evaluateBudget } from "./budget";

export interface BalanceProps {
  incomes: number;
  expenses: number;
}

export function Balance({ incomes, expenses }: BalanceProps) {
  const evaluation = evaluateBudget(incomes, expenses);
  const { isGood, formattedBalance } = fromEvaluation(evaluation);

  return (
    <div className="flex flex-wrap items-baseline justify-between">
      <label htmlFor="balance-output" className="text-foreground font-semibold">
        Balance
      </label>
      <output
        id="balance-output"
        className={cn(
          "text-foreground font-semibold",
          isGood ? "text-emerald-600" : "text-rose-600",
        )}
        aria-live="polite"
      >
        {formattedBalance}
      </output>
    </div>
  );
}

function fromEvaluation({ status, balance }: BudgetEvaluation) {
  const isGood = status !== "negative";
  const formattedBalance = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "ILS",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(balance);

  return {
    isGood,
    formattedBalance,
  };
}
