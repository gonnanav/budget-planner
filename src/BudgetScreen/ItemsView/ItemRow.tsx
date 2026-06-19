import { useCurrency } from "@/currency";
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
  const { format } = useCurrency();
  const formattedAmount = amount ? format(amount) : null;
  const frequencyText = frequency === "monthly" ? "Monthly" : "Bi-monthly";
  const formattedNormalizedAmount = `${format(normalizedAmount)}/month`;
  const showNormalizedAmount = frequency === "biMonthly";

  return (
    <li>
      <button type="button" className={classes.button} onClick={onClick}>
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
      </button>
    </li>
  );
}
