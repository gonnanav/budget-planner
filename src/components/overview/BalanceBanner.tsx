import { Card, CardBody } from "@heroui/react";
import { Check, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

type BalanceStatus = "balanced" | "surplus" | "deficit";

interface BalanceBannerProps {
  status: BalanceStatus;
  amount: string;
}

export function BalanceBanner({ status, amount }: BalanceBannerProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "balanced":
        return {
          label: "Balanced",
          icon: Check,
          bg: "bg-blue-50",
          border: "border-blue-200",
          textColor: "text-blue-900",
          iconColor: "text-blue-600",
        };
      case "surplus":
        return {
          label: "Surplus",
          icon: TrendingUp,
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          textColor: "text-emerald-900",
          iconColor: "text-emerald-600",
        };
      case "deficit":
        return {
          label: "Deficit",
          icon: TrendingDown,
          bg: "bg-rose-50",
          border: "border-rose-200",
          textColor: "text-rose-900",
          iconColor: "text-rose-600",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Card shadow="none" className={cn("border-2", config.bg, config.border)}>
      <CardBody className="py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={cn("h-5 w-5", config.iconColor)} />
            <span className={cn("font-medium", config.textColor)}>
              {config.label}
            </span>
          </div>
          <span className={cn("font-semibold text-lg", config.textColor)}>
            {amount}
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
