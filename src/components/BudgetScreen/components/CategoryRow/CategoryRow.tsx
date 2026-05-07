import classes from "./CategoryRow.module.css";

type CategoryRowProps = {
  name: string;
  amount: number;
  onClick: () => void;
};

export function CategoryRow({ name, amount, onClick }: CategoryRowProps) {
  return (
    <li className={classes.root} onClick={onClick}>
      <div className={classes.row}>
        <span className={classes.name}>{name}</span>
        <span className={classes.amount}>₪{amount.toLocaleString()}</span>
      </div>
    </li>
  );
}
