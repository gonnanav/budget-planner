import { ItemRow } from "../ItemRow/ItemRow";
import { EmptyList } from "../EmptyList/EmptyList";
import type { Item } from "domain/types";

interface ItemListProps {
  items: Item[];
  onItemClick: (item: Item) => void;
}

export function ItemList({ items, onItemClick }: ItemListProps) {
  if (items.length === 0) {
    return <EmptyList entity="item" />;
  }

  return (
    <ul>
      {items.map((item) => (
        <ItemRow
          key={item.id}
          name={item.name}
          amount={item.amount}
          frequency={item.frequency}
          normalizedAmount={item.normalizedAmount}
          onClick={() => onItemClick(item)}
        />
      ))}
    </ul>
  );
}
