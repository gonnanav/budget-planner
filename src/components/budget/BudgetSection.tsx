import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { BudgetEntry } from "./types";
import {
  addBudgetEntry,
  updateBudgetEntry,
  removeBudgetEntry,
  makeLabel,
} from "./budget-entries";
import { BudgetEntryRow } from "./BudgetEntryRow";
import { AddBudgetEntryModal } from "./AddBudgetEntryModal";

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
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const handleAddItem = (amount: number) => {
    onChange(addBudgetEntry(items, amount));
  };

  const handleRemoveItem = (index: number) => {
    onChange(removeBudgetEntry(items, index));
  };

  const handleUpdateItem = (index: number, entry: BudgetEntry) => {
    onChange(updateBudgetEntry(items, index, entry));
  };

  const itemLabelOf = makeLabel(itemLabel);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button
          size="sm"
          color="primary"
          onPress={onAddModalOpen}
          isIconOnly
          aria-label={addItemButtonLabel}
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">No entries yet.</p>
        ) : (
          items.map((expense, index) => (
            <BudgetEntryRow
              key={index}
              label={itemLabelOf(index)}
              entry={expense}
              removeButtonLabel={removeItemButtonLabel}
              onChange={(entry) => handleUpdateItem(index, entry)}
              onRemove={() => handleRemoveItem(index)}
            />
          ))
        )}
      </div>

      <AddBudgetEntryModal
        title={`Add ${itemLabel}`}
        isOpen={isAddModalOpen}
        onSave={handleAddItem}
        onClose={onAddModalClose}
      />
    </div>
  );
}
