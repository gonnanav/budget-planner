import { Card, CardBody } from "@heroui/react";
import { cn } from "@/lib/utils";

interface BudgetCardProps {
  title: string;
  amount: string;
  itemCount: number;
  categoryCount: number;
  variant: "income" | "expense";
}

export function BudgetCard({
  title,
  amount,
  itemCount,
  categoryCount,
  variant,
}: BudgetCardProps) {
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

        <div className="text-sm text-muted-foreground space-y-0.5">
          <p>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
          <p>
            {categoryCount} {categoryCount === 1 ? "category" : "categories"}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
