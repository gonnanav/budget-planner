import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";
import { AmountInput } from "./AmountInput";

interface BudgetItemProps {
  label: string;
  amount: number;
  removeButtonLabel: string;
  canRemove: boolean;
  onChange: (value: number) => void;
  onRemove: () => void;
}

export function BudgetItem({
  label,
  amount,
  removeButtonLabel,
  canRemove,
  onChange,
  onRemove,
}: BudgetItemProps) {
  return (
    <div className="flex items-center gap-3">
      <AmountInput
        label={label}
        amount={amount}
        className="flex-1"
        onChange={onChange}
      />
      {canRemove && (
        <Button
          size="sm"
          color="danger"
          onPress={onRemove}
          isIconOnly
          aria-label={removeButtonLabel}
        >
          <Trash2 size={16} />
        </Button>
      )}
    </div>
  );
}
