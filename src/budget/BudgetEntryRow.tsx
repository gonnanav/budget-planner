import { BudgetEntry } from "./core/types";
import { normalizeAmount } from "./core/budget-balance";

interface BudgetEntryRowProps {
  entry: BudgetEntry;
  onClick: () => void;
}

export function BudgetEntryRow({ entry, onClick }: BudgetEntryRowProps) {
  return (
    <div
      className="flex items-baseline justify-between rounded-md px-3 py-2 cursor-pointer bg-slate-50 hover:opacity-80 active:bg-slate-100 transition-colors transition-opacity"
      onClick={onClick}
    >
      <div className="flex items-baseline justify-between w-full gap-3">
        {entry.name && (
          <span className="text-muted-foreground text-sm truncate">
            {entry.name}
          </span>
        )}
        {entry.amount && (
          <span className="text-sm text-gray-900">
            ₪{entry.amount.toLocaleString()}
            {entry.frequency === "biMonthly" && (
              <span className="text-xs text-muted-foreground ml-2">
                (₪{normalizeAmount(entry).toLocaleString()}/month)
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
