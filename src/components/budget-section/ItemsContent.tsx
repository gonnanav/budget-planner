import { BudgetEntry } from "@/core/types";
import { ItemListItem } from "./ItemListItem";
import { SectionContent } from "./SectionContent";

interface ItemsContentProps {
  items: BudgetEntry[];
  onEditItem: (id: string) => void;
}

export function ItemsContent({ items, onEditItem }: ItemsContentProps) {
  const areItemsEmpty = items.length === 0;

  return (
    <SectionContent isEmpty={areItemsEmpty} emptyMessage="No items yet">
      {items.map((item) => (
        <ItemListItem
          key={item.id}
          entry={item}
          onClick={() => onEditItem(item.id)}
        />
      ))}
    </SectionContent>
  );
}
