

import { clsx } from "clsx";
import { formatAmount } from "./format";
import type { Section } from "./types";
import classes from "./SectionSummary.module.css";

type SectionSummaryProps = {
  section: Section;
  amount: number;
  selected: boolean;
  onSelect: () => void;
};

export function SectionSummary({
  section,
  amount,
  selected,
  onSelect,
}: SectionSummaryProps) {
  const title = section === "income" ? "Income" : "Expenses";
  const formattedAmount = formatAmount(amount);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(classes.root, {
        [classes.income]: section === "income",
        [classes.expense]: section === "expenses",
        [classes.active]: selected,
      })}
    >
      <div className={classes.content}>
        <h3 className={classes.heading}>{title}</h3>
        <p className={classes.value}>{formattedAmount}</p>
      </div>
    </button>
  );
}
