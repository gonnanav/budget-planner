import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";
import { BudgetEntry } from "./types";
import { AmountInput } from "./AmountInput";

interface BudgetEntryRowProps {
  label: string;
  entry: BudgetEntry;
  removeButtonLabel: string;
  onChange: (entry: BudgetEntry) => void;
  onRemove: () => void;
}

export function BudgetEntryRow({
  label,
  entry,
  removeButtonLabel,
  onChange,
  onRemove,
}: BudgetEntryRowProps) {
  return (
    <div className="flex items-center gap-3">
      <AmountInput
        label={label}
        amount={entry}
        className="flex-1"
        onChange={onChange}
      />
      <Button
        size="sm"
        color="danger"
        onPress={onRemove}
        isIconOnly
        aria-label={removeButtonLabel}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
