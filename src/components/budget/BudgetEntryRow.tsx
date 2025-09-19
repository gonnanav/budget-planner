import { BudgetEntry } from "./types";

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
      <div className="text-gray-900 truncate">₪{entry?.toLocaleString()}</div>
    </div>
  );
}
