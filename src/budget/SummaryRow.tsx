import { cn } from "@/lib/utils";

interface SummaryRowProps {
  label: string;
  value: string;
  backgroundColor: string;
  valueColor?: string;
  isBold?: boolean;
}

export function SummaryRow({
  label,
  value,
  backgroundColor,
  valueColor,
  isBold,
}: SummaryRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between rounded-md px-3 py-2",
        backgroundColor,
      )}
    >
      <span
        className={cn(
          "text-muted-foreground text-sm",
          isBold && "font-semibold",
        )}
      >
        {label}
      </span>
      <span
        className={cn("font-medium", valueColor, isBold && "font-semibold")}
      >
        {value}
      </span>
    </div>
  );
}
