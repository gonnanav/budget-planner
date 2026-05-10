import classes from "./CategoryRow.module.css";

type CategoryRowProps = {
  name: string;
  itemCount: number;
  total: number;
  onCategoryClick?: () => void;
};

export function CategoryRow({ name, itemCount, total, onCategoryClick }: CategoryRowProps) {
  const isEmpty = itemCount === 0;
  const totalText = isEmpty ? "No items" : `₪${total.toLocaleString()}/month`;
  const totalClass = isEmpty ? classes.emptyTotal : classes.total;

  if (onCategoryClick) {
    return (
      <button className={classes.root} onClick={onCategoryClick}>
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
