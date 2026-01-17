import styles from "./ItemRow.module.css";

interface ItemRowProps {
  name: string;
  amount: number | null;
  frequency: string;
  normalizedAmount: number;
  onClick: () => void;
}

export function ItemRow({
  name,
  amount,
  frequency,
  normalizedAmount,
  onClick,
}: ItemRowProps) {
  const formattedAmount = amount ? `₪${amount.toLocaleString()}` : null;
  const frequencyText = frequency === "monthly" ? "Monthly" : "Bi-monthly";
  const formattedNormalizedAmount = `₪${normalizedAmount.toLocaleString()}/month`;
  const showNormalizedAmount = frequency === "biMonthly";

  return (
    <li className={styles.root} onClick={onClick}>
      <div className={styles.primaryLine}>
        <span className={styles.nameText}>{name}</span>
        {formattedAmount && (
          <span className={styles.amountText}>{formattedAmount}</span>
        )}
      </div>
      <div className={styles.secondaryLine}>
        <span className={styles.frequencyText}>{frequencyText}</span>
        {showNormalizedAmount && (
          <span className={styles.normalizedAmountText}>
            {formattedNormalizedAmount}
          </span>
        )}
      </div>
    </li>
  );
}
