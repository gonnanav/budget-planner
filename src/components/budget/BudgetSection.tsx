import { useState } from "react";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { BudgetEntry } from "./types";
import {
  addBudgetEntry,
  updateBudgetEntry,
  removeBudgetEntry,
} from "./budget-entries";
import { BudgetEntryRow } from "./BudgetEntryRow";
import { BudgetEntryModal } from "./BudgetEntryModal";

interface BudgetSection {
  items: BudgetEntry[];
  title: string;
  itemLabel: string;
  addItemButtonLabel: string;
  removeItemButtonLabel: string;
  onChange: (entries: BudgetEntry[]) => void;
}

export function BudgetSection({
  items,
  title,
  itemLabel,
  addItemButtonLabel,
  removeItemButtonLabel,
  onChange,
}: BudgetSection) {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [editedEntryIndex, setEditedEntryIndex] = useState<number | null>(null);
  const editedAmount =
    editedEntryIndex === null ? null : items[editedEntryIndex];

  const handleModalSave = (amount: number) => {
    if (editedEntryIndex !== null) {
      onChange(updateBudgetEntry(items, editedEntryIndex, amount));
      setEditedEntryIndex(null);
    } else {
      onChange(addBudgetEntry(items, amount));
    }
  };

  const handleRemoveItem = (index: number) => {
    onChange(removeBudgetEntry(items, index));
  };

  const handleClickItem = (index: number) => {
    setEditedEntryIndex(index);
    onModalOpen();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button
          size="sm"
          color="primary"
          onPress={onModalOpen}
          isIconOnly
          aria-label={addItemButtonLabel}
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-center text-gray-400">No entries yet</p>
        ) : (
          <div className="flex flex-col">
            {items.map((expense, index) => (
              <BudgetEntryRow
                key={index}
                entry={expense}
                removeButtonLabel={removeItemButtonLabel}
                onClick={() => handleClickItem(index)}
                onRemove={() => handleRemoveItem(index)}
              />
            ))}
          </div>
        )}
      </div>

      <BudgetEntryModal
        title={editedAmount ? `Edit ${itemLabel}` : `Add ${itemLabel}`}
        isOpen={isModalOpen}
        amount={editedAmount}
        onSave={handleModalSave}
        onClose={onModalClose}
      />
    </div>
  );
}
