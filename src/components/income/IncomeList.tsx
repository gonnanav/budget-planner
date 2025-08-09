import { IncomeItem, type IncomeItemProps } from "./IncomeItem";

export interface IncomeListProps {
  items: IncomeItemProps[];
  onDelete: (index: number) => void;
  onUpdate: (index: number, next: { source: string; amount: number }) => void;
  autoFocusIndex?: number | null;
  autoFocusField?: "source" | "amount";
}

export function IncomeList({
  items,
  onDelete,
  onUpdate,
  autoFocusIndex,
  autoFocusField,
}: IncomeListProps) {
  return (
    <ul className="divide-y">
      {items.map((item, index) => (
        <li key={index}>
          <IncomeItem
            source={item.source}
            amount={item.amount}
            onUpdate={(next) => onUpdate(index, next)}
            onDelete={() => onDelete(index)}
            autoFocusField={
              index === autoFocusIndex ? autoFocusField : undefined
            }
          />
        </li>
      ))}
    </ul>
  );
}
