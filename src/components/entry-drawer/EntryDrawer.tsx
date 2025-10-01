import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";
import {
  BudgetEntry,
  BudgetEntryInput,
  BudgetEntryFrequency,
} from "@/core/types";
import { AmountInput } from "./AmountInput";
import { NameInput } from "./NameInput";
import { FrequencyInput } from "./FrequencyInput";

interface EntryDrawerProps {
  itemLabel: string;
  isOpen: boolean;
  entry?: BudgetEntry | null;
  onCancel: () => void;
  onSave: (input: BudgetEntryInput) => void;
  onClose: () => void;
  onDelete?: () => void;
}

export const EntryDrawer = ({
  itemLabel,
  isOpen,
  entry,
  onCancel,
  onSave,
  onClose,
  onDelete,
}: EntryDrawerProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<BudgetEntryFrequency>("monthly");

  const isEditMode = Boolean(entry);
  const title = isEditMode ? `Edit ${itemLabel}` : `Add ${itemLabel}`;

  useEffect(() => {
    if (!entry) {
      reset();
    } else {
      setName(entry.name);
      setAmount(entry.amount);
      setFrequency(entry.frequency);
    }
  }, [entry]);

  const reset = () => {
    setName("");
    setAmount(null);
    setFrequency("monthly");
  };

  const handleCancel = () => {
    onCancel();
    reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ name, amount, frequency });
    reset();
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>
            <NameInput name={name} onChange={setName} />
            <AmountInput amount={amount} onChange={setAmount} />
            <FrequencyInput frequency={frequency} onChange={setFrequency} />
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="light" onPress={handleCancel}>
              Cancel
            </Button>
            {isEditMode && (
              <Button
                color="danger"
                onPress={onDelete}
                isIconOnly
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </Button>
            )}
            <Button color="primary" type="submit">
              Save
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
