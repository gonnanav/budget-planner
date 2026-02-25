

import { clsx } from "clsx";
import { formatAmount } from "lib/format";
import classes from "./SectionSummary.module.css";

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
      className={clsx(classes.root, {
        [classes.income]: variant === "income",
        [classes.expense]: variant === "expense",
        [classes.active]: isActive,
      })}
    >
      <div className={classes.content}>
        <h3>{title}</h3>
        <p>{formattedAmount}</p>
      </div>
    </button>
  );
}
