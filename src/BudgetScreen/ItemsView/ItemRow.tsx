import classes from "./ItemRow.module.css";

type ItemRowProps = {
  name: string;
  amount: number | null;
  frequency: string;
  normalizedAmount: number;
  onClick: () => void;
};

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
        <span className={classes.name}>{name}</span>
        {formattedAmount && (
          <span className={classes.amount}>{formattedAmount}</span>
        )}
      </div>
      <div className={classes.secondaryLine}>
        <span className={classes.frequency}>{frequencyText}</span>
        {showNormalizedAmount && (
          <span className={classes.normalized}>
            {formattedNormalizedAmount}
          </span>
        )}
      </div>
    </li>
  );
}
