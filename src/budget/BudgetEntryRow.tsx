import { BudgetEntry } from "./core/types";
import { normalizeAmount } from "./core/budget-balance";

interface BudgetEntryRowProps {
  entry: BudgetEntry;
  onClick: () => void;
}

export function BudgetEntryRow({ entry, onClick }: BudgetEntryRowProps) {
  return (
    <div
      className="flex items-baseline justify-between rounded-md px-3 py-2 cursor-pointer hover:opacity-80 transition-opacity hover:bg-gray-50 active:bg-gray-100"
      onClick={onClick}
    >
      <div className="flex items-baseline justify-between w-full gap-3">
        {entry.name && (
          <span className="text-muted-foreground text-sm truncate">
            {entry.name}
          </span>
        )}
        {entry.amount && (
          <span className="font-medium text-gray-900">
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
