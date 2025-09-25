import { BudgetEntry } from "./core/types";
import { normalizeAmount } from "./core/budget-balance";

interface BudgetEntryRowProps {
  entry: BudgetEntry;
  onClick: () => void;
}

export function BudgetEntryRow({ entry, onClick }: BudgetEntryRowProps) {
  return (
    <div
      className="flex justify-between px-2 py-2 transition-colors hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between text-gray-900 truncate w-full">
        {entry.name && <span className="mr-3">{entry.name}</span>}
        {entry.amount && (
          <span>
            ₪{entry.amount.toLocaleString()}
            {entry.frequency === "biMonthly" && (
              <span className="text-sm text-gray-600 ml-1">
                (₪{normalizeAmount(entry).toLocaleString()}/month)
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
