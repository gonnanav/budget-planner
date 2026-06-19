

import { clsx } from "clsx";
import { useCurrency } from "@/currency";
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
  const { format } = useCurrency();
  const title = section === "income" ? "Income" : "Expenses";
  const formattedAmount = format(amount);

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={clsx(classes.root, {
        [classes.income]: section === "income",
        [classes.expense]: section === "expenses",
        [classes.active]: selected,
      })}
      onClick={onSelect}
    >
      <h3 className={classes.heading}>{title}</h3>
      <p className={classes.value}>{formattedAmount}</p>
    </button>
  );
}
