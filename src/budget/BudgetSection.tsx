import { Button } from "@heroui/button";
import { Plus } from "lucide-react";
import { BudgetEntry, BudgetEntryInput } from "./core/types";
import { BudgetEntryRow } from "./BudgetEntryRow";
import { BudgetEntryDrawer } from "./BudgetEntryDrawer";
import { useBudgetEntryDrawer } from "./hooks/useBudgetEntryDrawer";

interface BudgetSection {
  entries: BudgetEntry[];
  title: string;
  itemLabel: string;
  addItemButtonLabel: string;
  onAddEntry: (input: BudgetEntryInput) => void;
  onUpdateEntry: (index: number, input: BudgetEntryInput) => void;
  onDeleteEntry: (index: number) => void;
}

export function BudgetSection({
  entries,
  title,
  itemLabel,
  addItemButtonLabel,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
}: BudgetSection) {
  const {
    isOpen,
    editedEntry,
    onEditEntry,
    onOpen,
    onClose,
    onSave,
    onDelete,
  } = useBudgetEntryDrawer({
    entries,
    onAddEntry,
    onUpdateEntry,
    onDeleteEntry,
  });

  const handleCancel = () => {
    onClose();
  };

  const handleSave = (input: BudgetEntryInput) => {
    onSave(input);
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button
          size="sm"
          color="primary"
          onPress={onOpen}
          isIconOnly
          aria-label={addItemButtonLabel}
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {entries.length === 0 ? (
          <p className="text-sm text-center text-gray-400">No entries yet</p>
        ) : (
          <div className="flex flex-col gap-px">
            {entries.map((entry, index) => (
              <BudgetEntryRow
                key={entry.id}
                entry={entry}
                onClick={() => onEditEntry(index)}
              />
            ))}
          </div>
        )}
      </div>

      <BudgetEntryDrawer
        itemLabel={itemLabel}
        isOpen={isOpen}
        entry={editedEntry}
        onSave={handleSave}
        onClose={handleCancel}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
    </div>
  );
}
