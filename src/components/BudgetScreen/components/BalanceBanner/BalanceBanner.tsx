import { Paper } from "@mantine/core";
import { Check, TrendingUp, TrendingDown } from "lucide-react";
import { clsx } from "clsx";
import { formatAmount } from "lib/format";
import classes from "./BalanceBanner.module.css";
import type { Balance } from "domain/types";

interface BalanceBannerProps {
  balance: Balance;
}

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
    <Paper shadow="none" className={clsx(classes.root, classes[status])}>
      <div className={classes.body}>
        <div className={classes.row}>
          <div className={classes.left}>
            <Icon className={classes.icon} />
            <span className={classes.label}>{config.label}</span>
          </div>
          <span className={classes.amount}>{formattedAmount}</span>
        </div>
      </div>
    </Paper>
  );
}
