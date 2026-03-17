import { ItemRow } from "../ItemRow/ItemRow";
import type { Item } from "domain/types";
import classes from "./CategoryGroup.module.css";

type CategoryGroupProps = {
  name: string;
  total: number;
  items: Item[];
  onItemClick: (item: Item) => void;
};

export function CategoryGroup({
  name,
  total,
  items,
  onItemClick,
}: CategoryGroupProps) {
  const isEmpty = items.length === 0;
  const totalText = isEmpty
    ? "No items"
    : `₪${total.toLocaleString()}/month`;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span className={classes.name}>{name}</span>
        <span className={isEmpty ? classes.emptyTotal : classes.total}>
          {totalText}
        </span>
      </div>
      {items.length > 0 && (
        <ul className={classes.items}>
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
      )}
    </div>
  );
}
