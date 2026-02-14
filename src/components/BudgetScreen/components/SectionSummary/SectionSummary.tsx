

import { clsx } from "clsx";
import { formatAmount } from "lib/format";
import styles from "./SectionSummary.module.css";

interface SectionSummaryProps {
  title: string;
  amount: number;
  variant: "income" | "expense";
  isActive?: boolean;
  onClick?: () => void;
}

export function SectionSummary({
  title,
  amount,
  variant,
  isActive = false,
  onClick,
}: SectionSummaryProps) {
  const formattedAmount = formatAmount(amount);

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(styles.root, {
        [styles.income]: variant === "income",
        [styles.expense]: variant === "expense",
        [styles.active]: isActive,
      })}
    >
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{formattedAmount}</p>
      </div>
    </button>
  );
}
