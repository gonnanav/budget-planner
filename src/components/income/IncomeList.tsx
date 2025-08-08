import { IncomeItem, type IncomeItemProps } from "./IncomeItem";

export interface IncomeListProps {
  items: IncomeItemProps[];
  className?: string;
  onDelete?: (index: number) => void;
  onUpdate?: (index: number, next: { source: string; amount: number }) => void;
  autoFocusIndex?: number | null;
  autoFocusField?: "source" | "amount";
}

export function IncomeList({
  items,
  className,
  onDelete,
  onUpdate,
  autoFocusIndex = null,
  autoFocusField,
}: IncomeListProps) {
  return (
    <ul className={`divide-y ${className ?? ""}`}>
      {items.map((item, index) => (
        <li key={index}>
          <IncomeItem
            source={item.source}
            amount={item.amount}
            onUpdate={onUpdate ? (next) => onUpdate(index, next) : undefined}
            onDelete={onDelete ? () => onDelete(index) : undefined}
            autoFocusField={
              index === autoFocusIndex ? autoFocusField : undefined
            }
          />
        </li>
      ))}
    </ul>
  );
}
