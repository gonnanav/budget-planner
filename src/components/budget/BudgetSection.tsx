import { useState } from "react";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { BudgetEntry, BudgetEntryInput } from "./core/types";
import { BudgetEntryRow } from "./BudgetEntryRow";
import { BudgetEntryDrawer } from "./BudgetEntryDrawer";

interface BudgetSection {
  items: BudgetEntry[];
  title: string;
  itemLabel: string;
  addItemButtonLabel: string;
  onAddEntry: (input: BudgetEntryInput) => void;
  onUpdateEntry: (index: number, input: BudgetEntryInput) => void;
  onDeleteEntry: (index: number) => void;
}

export function BudgetSection({
  items,
  title,
  itemLabel,
  addItemButtonLabel,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
}: BudgetSection) {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [editedEntryIndex, setEditedEntryIndex] = useState<number | null>(null);
  const editedEntry =
    editedEntryIndex === null ? null : items[editedEntryIndex];

  const handleModalSave = (input: BudgetEntryInput) => {
    if (editedEntryIndex !== null) {
      onUpdateEntry(editedEntryIndex, input);
    } else {
      onAddEntry(input);
    }
  };

  const handleDeleteEntry = (index: number | null) => {
    if (index === null) return;
    onDeleteEntry(index);
  };

  const handleClickEntry = (index: number) => {
    setEditedEntryIndex(index);
    onModalOpen();
  };

  const handleModalClose = () => {
    onModalClose();
    setEditedEntryIndex(null);
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
            {items.map((entry, index) => (
              <BudgetEntryRow
                key={entry.id}
                entry={entry}
                onClick={() => handleClickEntry(index)}
              />
            ))}
          </div>
        )}
      </div>

      <BudgetEntryDrawer
        title={editedEntryIndex ? `Edit ${itemLabel}` : `Add ${itemLabel}`}
        isOpen={isModalOpen}
        entry={editedEntry}
        onSave={handleModalSave}
        onClose={handleModalClose}
        onDelete={() => handleDeleteEntry(editedEntryIndex)}
      />
    </div>
  );
}
