import type { Category, CategoryGroup } from "@/domain/types";
import classes from "./CategoryRow.module.css";

type CategoryRowProps = {
  group: CategoryGroup;
  onCategoryClick: (category: Category) => void;
};

export function CategoryRow({ group, onCategoryClick }: CategoryRowProps) {
  const name = group.kind === "categorized" ? group.category.name : "Uncategorized";
  const isEmpty = group.items.length === 0;
  const totalText = isEmpty ? "No items" : `₪${group.total.toLocaleString()}/month`;
  const totalClass = isEmpty ? classes.emptyTotal : classes.total;

  if (group.kind === "categorized") {
    return (
      <button className={classes.root} onClick={() => onCategoryClick(group.category)}>
        <span className={classes.name}>{name}</span>
        <span className={totalClass}>{totalText}</span>
      </button>
    );
  }

  return (
    <div className={classes.root}>
      <span className={classes.name}>{name}</span>
      <span className={totalClass}>{totalText}</span>
    </div>
  );
}
