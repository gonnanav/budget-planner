import { BudgetEntry } from "@/core/types";
import { normalizeAmount } from "@/core/budget-balance";
import { ItemListItem } from "./ItemListItem";
import { SectionContent } from "./SectionContent";

interface ItemsContentProps {
  items: BudgetEntry[];
  onEditItem: (id: string) => void;
}

export function ItemsContent({ items, onEditItem }: ItemsContentProps) {
  return (
    <SectionContent items={items} emptyMessage="No items yet">
      {(item) => (
        <ItemListItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          frequency={item.frequency}
          normalizedAmount={normalizeAmount(item)}
          onClick={() => onEditItem(item.id)}
        />
      )}
    </SectionContent>
  );
}
