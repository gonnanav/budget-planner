import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";
import { AmountInput } from "./AmountInput";

interface ExpenseProps {
  label: string;
  amount: number;
  canRemove: boolean;
  onChange: (value: number) => void;
  onRemove: () => void;
}

export function Expense({
  label,
  amount,
  canRemove,
  onChange,
  onRemove,
}: ExpenseProps) {
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
          aria-label="Remove expense"
        >
          <Trash2 size={16} />
        </Button>
      )}
    </div>
  );
}
