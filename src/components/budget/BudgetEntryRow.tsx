import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";
import { BudgetEntry } from "./types";

interface BudgetEntryRowProps {
  entry: BudgetEntry;
  removeButtonLabel: string;
  onRemove: () => void;
  onClick: () => void;
}

export function BudgetEntryRow({
  entry,
  removeButtonLabel,
  onRemove,
  onClick,
}: BudgetEntryRowProps) {
  return (
    <div
      className="flex justify-between px-2 py-2 transition-colors hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-gray-900 truncate">₪{entry?.toLocaleString()}</div>
      <Button
        size="sm"
        color="danger"
        variant="light"
        onPress={onRemove}
        isIconOnly
        aria-label={removeButtonLabel}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
