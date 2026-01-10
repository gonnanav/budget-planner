import { Card, CardBody } from "@heroui/react";
import { Check, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "lib/utils";
import styles from "./BalanceBanner.module.css";

type BalanceStatus = "balanced" | "surplus" | "deficit";

interface BalanceBannerProps {
  status: BalanceStatus;
  amount: string;
}

export function BalanceBanner({ status, amount }: BalanceBannerProps) {
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
          <span className={styles.amount}>{amount}</span>
        </div>
      </CardBody>
    </Card>
  );
}
