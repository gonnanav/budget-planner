import clsx from "clsx";
import classes from "./GroupHeader.module.css";

type GroupHeaderProps = {
  name: string;
  itemCount: number;
  total: number;
  className?: string;
};

export function GroupHeader({ name, itemCount, total, className }: GroupHeaderProps) {
  const isEmpty = itemCount === 0;
  const totalText = isEmpty ? "No items" : `₪${total.toLocaleString()}/month`;
  const totalClass = isEmpty ? classes.emptyTotal : classes.total;

  return (
    <div className={clsx(classes.root, className)}>
      <span className={classes.name}>{name}</span>
      <span className={totalClass}>{totalText}</span>
    </div>
  );
}
