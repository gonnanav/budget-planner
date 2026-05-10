import { ItemList } from "./ItemList";
import { CategoryRow } from "./CategoryRow";
import type { Item, Category, SectionState } from "@/domain/types";
import classes from "./ItemsView.module.css";

type ItemsViewProps = {
  sectionState: SectionState;
  onItemClick: (item: Item) => void;
  onCategoryClick: (category: Category) => void;
};

export function ItemsView({ sectionState, onItemClick, onCategoryClick }: ItemsViewProps) {
  const { items, categories, uncategorized } = sectionState;

  if (items.length === 0) {
    return <p className={classes.empty}>No items yet.</p>;
  }

  if (categories.length === 0) {
    return <ItemList items={items} onItemClick={onItemClick} />;
  }

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} className={classes.group}>
          <CategoryRow
            name={category.name}
            itemCount={category.items.length}
            total={category.total}
            onCategoryClick={() => onCategoryClick(category)}
          />
          {category.items.length > 0 && (
            <ItemList items={category.items} onItemClick={onItemClick} />
          )}
        </div>
      ))}
      {uncategorized.items.length > 0 && (
        <div className={classes.group}>
          <CategoryRow
            name="Uncategorized"
            itemCount={uncategorized.items.length}
            total={uncategorized.total}
          />
          <ItemList items={uncategorized.items} onItemClick={onItemClick} />
        </div>
      )}
    </div>
  );
}
