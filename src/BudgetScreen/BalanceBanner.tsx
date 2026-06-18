import { Check, TrendingUp, TrendingDown } from "lucide-react";
import { clsx } from "clsx";
import { useCurrency } from "@/currency";
import classes from "./BalanceBanner.module.css";
import type { Balance } from "./types";

type BalanceBannerProps = {
  balance: Balance;
  empty: boolean;
};

const statusConfig = {
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
};

export function BalanceBanner({ balance, empty }: BalanceBannerProps) {
  const { format } = useCurrency();
  const { status, delta } = balance;
  const { label, icon: Icon } = statusConfig[status];
  const stateClass = empty ? classes.empty : classes[status];
  const formattedDelta = format(Math.abs(delta));

  return (
    <div role="status" aria-label="Balance" className={clsx(classes.root, stateClass)}>
      {empty ? (
        <span className={classes.label}>Add items to see your balance</span>
      ) : (
        <>
          <div className={classes.left}>
            <Icon className={classes.icon} />
            <span className={classes.label}>{label}</span>
          </div>
          {status !== "balanced" && (
            <span className={classes.amount}>{formattedDelta}</span>
          )}
        </>
      )}
    </div>
  );
}
