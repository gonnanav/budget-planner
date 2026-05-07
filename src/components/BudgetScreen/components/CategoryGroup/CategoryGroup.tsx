import { ItemRow } from "@/components/BudgetScreen/components/ItemRow/ItemRow";
import type { Item, CategoryGroup as CategoryGroupType } from "@/domain/types";
import classes from "./CategoryGroup.module.css";

type CategoryGroupProps = {
  group: CategoryGroupType;
  onItemClick: (item: Item) => void;
  onHeaderClick: () => void;
};

export function CategoryGroup({ group, onItemClick, onHeaderClick }: CategoryGroupProps) {
  const name = group.kind === "categorized" ? group.category.name : "Uncategorized";
  const isEmpty = group.items.length === 0;
  const totalText = isEmpty ? "No items" : `₪${group.total.toLocaleString()}/month`;

  const header =
    group.kind === "categorized" ? (
      <button className={classes.header} onClick={onHeaderClick}>
        <span className={classes.name}>{name}</span>
        <span className={isEmpty ? classes.emptyTotal : classes.total}>
          {totalText}
        </span>
      </button>
    ) : (
      <div className={classes.header}>
        <span className={classes.name}>{name}</span>
        <span className={isEmpty ? classes.emptyTotal : classes.total}>
          {totalText}
        </span>
      </div>
    );

  return (
    <div className={classes.root}>
      {header}
      {group.items.length > 0 && (
        <ul className={classes.items}>
          {group.items.map((item) => (
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
