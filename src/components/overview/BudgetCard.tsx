import { Card, CardBody } from "@heroui/react";
import { cn } from "@/lib/utils";

interface BudgetCardProps {
  title: string;
  amount: string;
  variant: "income" | "expense";
}

export function BudgetCard({ title, amount, variant }: BudgetCardProps) {
  const variantStyles = {
    income: "bg-emerald-50 border-emerald-200 hover:border-emerald-300",
    expense: "bg-rose-50 border-rose-200 hover:border-rose-300",
  };

  return (
    <Card
      shadow="sm"
      className={cn(
        "border-2 transition-all hover:shadow-md hover:-translate-y-0.5",
        variantStyles[variant],
      )}
    >
      <CardBody className="p-5 space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>

        <p className="text-xl md:text-2xl font-semibold tracking-tight">
          {amount}
        </p>
      </CardBody>
    </Card>
  );
}
