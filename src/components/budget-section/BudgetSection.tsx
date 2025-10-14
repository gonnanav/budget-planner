import { Button } from "@heroui/button";
import { Plus } from "lucide-react";
import { BudgetEntry, BudgetEntryInput, Category } from "@/core/types";
import { EntryRow } from "./EntryRow";
import { EntryDrawer } from "@/components/entry-drawer";
import { useBudgetEntryDrawer } from "@/hooks/useBudgetEntryDrawer";

interface BudgetSection {
  entries: BudgetEntry[];
  categories: Category[];
  title: string;
  itemLabel: string;
  addItemButtonLabel: string;
  onAddEntry: (input: BudgetEntryInput) => void;
  onUpdateEntry: (id: string, input: BudgetEntryInput) => void;
  onDeleteEntry: (id: string) => void;
  onClickCategories: () => void;
}

export function BudgetSection({
  entries,
  categories,
  title,
  itemLabel,
  addItemButtonLabel,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  onClickCategories,
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
      <Button
        size="sm"
        variant="light"
        color="primary"
        onPress={onClickCategories}
      >
        Categories
      </Button>

      <div className="space-y-3">
        {entries.length === 0 ? (
          <p className="text-sm text-center text-gray-400">No entries yet</p>
        ) : (
          <div className="flex flex-col gap-px">
            {entries.map((entry) => (
              <EntryRow
                key={entry.id}
                entry={entry}
                onClick={() => onEditEntry(entry.id)}
              />
            ))}
          </div>
        )}
      </div>

      <EntryDrawer
        itemLabel={itemLabel}
        isOpen={isOpen}
        entry={editedEntry}
        categories={categories}
        onSave={handleSave}
        onClose={handleCancel}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
    </div>
  );
}
