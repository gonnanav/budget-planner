import { BudgetEntry } from "./core/types";

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
      <div className="text-gray-900 truncate">
        {entry.name && <span className="mr-3">{entry.name}</span>}
        {entry.name && entry.amount && (
          <span className="text-gray-400 mr-3">•</span>
        )}
        {entry.amount && `₪${entry.amount.toLocaleString()}`}
      </div>
    </div>
  );
}
