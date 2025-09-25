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
} from "./core/types";
import { AmountInput } from "./AmountInput";
import { NameInput } from "./NameInput";
import { FrequencyInput } from "./FrequencyInput";

interface BudgetEntryDrawerProps {
  title: string;
  isOpen: boolean;
  entry?: BudgetEntry | null;
  onSave: (input: BudgetEntryInput) => void;
  onClose: () => void;
  onDelete?: () => void;
}

export const BudgetEntryDrawer = ({
  title,
  isOpen,
  entry,
  onSave,
  onClose,
  onDelete,
}: BudgetEntryDrawerProps) => {
  const [name, setName] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<BudgetEntryFrequency | null>(
    "monthly",
  );
  const isEditMode = entry !== null;

  useEffect(() => {
    if (!entry) return;

    setName(entry.name ?? null);
    setAmount(entry.amount);
    setFrequency(entry.frequency ?? null);
  }, [entry]);

  const handleNameChange = (name: string | null) => {
    setName(name);
  };

  const handleAmountChange = (amount: number | null) => {
    setAmount(amount);
  };

  const handleFrequencyChange = (frequency: BudgetEntryFrequency | null) => {
    setFrequency(frequency);
  };

  const reset = () => {
    setName(null);
    setAmount(null);
    setFrequency("monthly");
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleSave = () => {
    onSave({ name: name ?? "", amount, frequency: frequency ?? undefined });
    handleClose();
  };

  const handleDelete = () => {
    onDelete?.();
    handleClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={handleClose}>
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>
            <NameInput label="Name" name={name} onChange={handleNameChange} />
            <AmountInput
              label="Amount"
              amount={amount}
              onChange={handleAmountChange}
            />
            <FrequencyInput
              label="Frequency"
              frequency={frequency}
              onChange={handleFrequencyChange}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              Cancel
            </Button>
            {isEditMode && (
              <Button
                color="danger"
                onPress={handleDelete}
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
