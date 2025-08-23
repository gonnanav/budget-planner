import { Button } from "@heroui/button";
import { Plus } from "lucide-react";
import { BudgetEntry } from "./types";
import {
  addBudgetEntry,
  updateBudgetEntry,
  removeBudgetEntry,
  canRemoveBudgetEntry,
  makeLabel,
} from "./budget-entries";
import { BudgetEntryRow } from "./BudgetEntryRow";

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
  const canRemove = canRemoveBudgetEntry(items);

  const handleAddItem = () => {
    onChange(addBudgetEntry(items));
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
          onPress={handleAddItem}
          isIconOnly
          aria-label={addItemButtonLabel}
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((expense, index) => (
          <BudgetEntryRow
            key={index}
            label={itemLabelOf(index)}
            entry={expense}
            removeButtonLabel={removeItemButtonLabel}
            canRemove={canRemove}
            onChange={(entry) => handleUpdateItem(index, entry)}
            onRemove={() => handleRemoveItem(index)}
          />
        ))}
      </div>
    </div>
  );
}
