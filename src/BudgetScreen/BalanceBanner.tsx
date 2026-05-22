import { Check, TrendingUp, TrendingDown } from "lucide-react";
import { clsx } from "clsx";
import { formatAmount } from "./format";
import classes from "./BalanceBanner.module.css";
import type { Balance } from "./types";

type BalanceBannerProps = {
  balance: Balance;
};

export function BalanceBanner({
  balance: { status, delta },
}: BalanceBannerProps) {
  const formattedAmount = formatAmount(Math.abs(delta));
  const config = {
    balanced: {
      label: "Balanced",
      icon: Check,
    },
    surplus: {
      label: "Surplus",
      icon: TrendingUp,
    },
    deficit: {
      label: "Deficit",
      icon: TrendingDown,
    },
  }[status];
  const Icon = config.icon;

  return (
    <div role="status" aria-label="Balance" className={clsx(classes.root, classes[status])}>
      <div className={classes.left}>
        <Icon className={classes.icon} />
        <span className={classes.label}>{config.label}</span>
      </div>
      <span className={classes.amount}>{formattedAmount}</span>
    </div>
  );
}
