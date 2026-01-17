import { Card, CardBody } from "@heroui/react";
import { Check, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "lib/utils";
import { formatAmount } from "lib/format";
import styles from "./BalanceBanner.module.css";
import { Balance } from "core/types";

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
    <Card shadow="none" className={cn(styles.root, styles[status])}>
      <CardBody className={styles.body}>
        <div className={styles.row}>
          <div className={styles.left}>
            <Icon className={styles.icon} />
            <span className={styles.label}>{config.label}</span>
          </div>
          <span className={styles.amount}>{formattedAmount}</span>
        </div>
      </CardBody>
    </Card>
  );
}
