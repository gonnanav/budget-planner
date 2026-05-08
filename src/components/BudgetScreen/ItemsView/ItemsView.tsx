import { ItemList } from "./ItemList";
import { CategoryRow } from "./CategoryRow";
import type { Item, Category, CategoryGroup } from "@/domain/types";
import classes from "./ItemsView.module.css";

type ItemsViewProps = {
  items: Item[];
  groups: CategoryGroup[];
  onItemClick: (item: Item) => void;
  onCategoryClick: (category: Category) => void;
};

export function ItemsView({ items, groups, onItemClick, onCategoryClick }: ItemsViewProps) {
  if (items.length === 0) {
    return <p className={classes.empty}>No items yet.</p>;
  }

  if (groups.length === 0) {
    return <ItemList items={items} onItemClick={onItemClick} />;
  }

  return (
    <div>
      {groups.map((group) => (
        <div
          key={group.kind === "categorized" ? group.category.id : group.kind}
          className={classes.group}
        >
          <CategoryRow group={group} onCategoryClick={onCategoryClick} />
          {group.items.length > 0 && (
            <ItemList items={group.items} onItemClick={onItemClick} />
          )}
        </div>
      ))}
    </div>
  );
}
