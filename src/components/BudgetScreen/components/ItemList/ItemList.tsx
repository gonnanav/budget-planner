import { ItemRow } from "../ItemRow/ItemRow";
import { CategoryGroup } from "../CategoryGroup/CategoryGroup";
import { EmptyList } from "../EmptyList/EmptyList";
import type { Item, CategoryGroup as CategoryGroupType } from "domain/types";

type ItemListProps = {
  items: Item[];
  groups: CategoryGroupType[];
  onItemClick: (item: Item) => void;
};

export function ItemList({ items, groups, onItemClick }: ItemListProps) {
  if (items.length === 0) {
    return <EmptyList entity="item" />;
  }

  if (groups.length === 0) {
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

  return (
    <div>
      {groups.map((group) => {
        const key =
          group.kind === "categorized" ? group.category.id : "uncategorized";
        const name =
          group.kind === "categorized" ? group.category.name : "Uncategorized";

        return (
          <CategoryGroup
            key={key}
            name={name}
            total={group.total}
            items={group.items}
            onItemClick={onItemClick}
          />
        );
      })}
    </div>
  );
}
