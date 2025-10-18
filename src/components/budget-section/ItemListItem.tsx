import { BudgetEntry } from "@/core/types";
import { normalizeAmount } from "@/core/budget-balance";
import { SectionListItem } from "./SectionListItem";

interface ItemListItemProps {
  entry: BudgetEntry;
  onClick: () => void;
}

export function ItemListItem({ entry, onClick }: ItemListItemProps) {
  return (
    <SectionListItem ariaLabel={entry.name} onClick={onClick}>
      {entry.name && (
        <span className="text-muted-foreground text-sm truncate">
          {entry.name}
        </span>
      )}
      {entry.amount && (
        <span className="text-sm text-gray-900">
          {entry.frequency === "biMonthly" && (
            <span className="text-xs text-muted-foreground mr-2">
              (₪{normalizeAmount(entry).toLocaleString()}/month)
            </span>
          )}
          ₪{entry.amount.toLocaleString()}
        </span>
      )}
    </SectionListItem>
  );
}
