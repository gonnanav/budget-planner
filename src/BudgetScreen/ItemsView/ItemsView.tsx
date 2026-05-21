import { ItemList } from "./ItemList";
import type { Item, Category, SectionState } from "../types";
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
        <div key={category.name} className={classes.group}>
          <button className={classes.header} onClick={() => onCategoryClick(category)}>
            <span className={classes.name}>{category.name}</span>
            <span className={classes.total}>₪{category.total.toLocaleString()}/month</span>
          </button>
          {category.items.length > 0 && (
            <ItemList items={category.items} onItemClick={onItemClick} />
          )}
        </div>
      ))}
      {uncategorized.items.length > 0 && (
        <div className={classes.group}>
          <div className={classes.header}>
            <span className={classes.name}>Uncategorized</span>
            <span className={classes.total}>₪{uncategorized.total.toLocaleString()}/month</span>
          </div>
          <ItemList items={uncategorized.items} onItemClick={onItemClick} />
        </div>
      )}
    </div>
  );
}
