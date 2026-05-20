import clsx from "clsx";
import classes from "./GroupHeader.module.css";

type GroupHeaderProps = {
  name: string;
  total: number;
  className?: string;
};

export function GroupHeader({ name, total, className }: GroupHeaderProps) {
  return (
    <div className={clsx(classes.root, className)}>
      <span className={classes.name}>{name}</span>
      <span className={classes.total}>₪{total.toLocaleString()}/month</span>
    </div>
  );
}
