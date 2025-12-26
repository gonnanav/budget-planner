"use client";

import { cn } from "@/lib/utils";
import styles from "./SectionSummary.module.css";

interface SectionSummaryProps {
  title: string;
  amount: string;
  variant: "income" | "expense";
  onClick?: () => void;
}

export function SectionSummary({
  title,
  amount,
  variant,
  onClick,
}: SectionSummaryProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(styles.root, {
        [styles.income]: variant === "income",
        [styles.expense]: variant === "expense",
      })}
    >
      <div className="space-y-3">
        <h3>{title}</h3>
        <p>{amount}</p>
      </div>
    </button>
  );
}
