import { ItemRow } from "./ItemRow";
import type { Item } from "@/domain/types";
import classes from "./ItemList.module.css";

type ItemListProps = {
  items: Item[];
  onItemClick: (item: Item) => void;
};

export function ItemList({ items, onItemClick }: ItemListProps) {
  return (
    <ul className={classes.root}>
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
