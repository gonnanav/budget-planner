import { ItemRow } from "./ItemRow";
import { CategoryGroup } from "./CategoryGroup";
import type { Item, Category, CategoryGroup as CategoryGroupType } from "@/domain/types";
import classes from "./ItemList.module.css";

type ItemListProps = {
  items: Item[];
  groups: CategoryGroupType[];
  onItemClick: (item: Item) => void;
  onCategoryClick: (category: Category) => void;
};

export function ItemList({ items, groups, onItemClick, onCategoryClick }: ItemListProps) {
  if (items.length === 0) {
    return <p className={classes.empty}>No items yet.</p>;
  }
  
  function handleHeaderClick(group: CategoryGroupType) {
    if (group.kind !== "categorized") return;

    onCategoryClick(group.category);
  }
  

  if (groups.length === 0) {
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

  return (
    <div>
      {groups.map((group) => (
        <CategoryGroup
          key={group.kind === "categorized" ? group.category.id : group.kind}
          group={group}
          onItemClick={onItemClick}
          onHeaderClick={() => handleHeaderClick(group)}
        />
      ))}
    </div>
  );
}
