import styles from "./CategoryRow.module.css";

interface CategoryRowProps {
  name: string;
  amount: number;
  onClick: () => void;
}

export function CategoryRow({ name, amount, onClick }: CategoryRowProps) {
  return (
    <li className={styles.root} onClick={onClick}>
      <div className={styles.row}>
        <span className={styles.name}>{name}</span>
        <span className={styles.amount}>₪{amount.toLocaleString()}</span>
      </div>
    </li>
  );
}
