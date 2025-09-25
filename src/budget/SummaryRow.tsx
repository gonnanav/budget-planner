import { cn } from "@/lib/utils";

interface SummaryRowProps {
  label: string;
  value: string;
  backgroundColor: string;
  valueColor?: string;
  isBold?: boolean;
  onClick?: () => void;
}

export function SummaryRow({
  label,
  value,
  backgroundColor,
  valueColor,
  isBold,
  onClick,
}: SummaryRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between rounded-md px-3 py-2",
        backgroundColor,
        onClick && "cursor-pointer hover:opacity-80 transition-opacity",
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "text-muted-foreground text-sm",
          isBold && "font-semibold",
        )}
      >
        {label}
      </span>
      <span className={cn("text-sm", valueColor, isBold && "font-semibold")}>
        {value}
      </span>
    </div>
  );
}
