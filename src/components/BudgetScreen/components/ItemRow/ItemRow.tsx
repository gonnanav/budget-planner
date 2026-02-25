import classes from "./ItemRow.module.css";

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
    <li className={classes.root} onClick={onClick}>
      <div className={classes.primaryLine}>
        <span className={classes.nameText}>{name}</span>
        {formattedAmount && (
          <span className={classes.amountText}>{formattedAmount}</span>
        )}
      </div>
      <div className={classes.secondaryLine}>
        <span className={classes.frequencyText}>{frequencyText}</span>
        {showNormalizedAmount && (
          <span className={classes.normalizedAmountText}>
            {formattedNormalizedAmount}
          </span>
        )}
      </div>
    </li>
  );
}
