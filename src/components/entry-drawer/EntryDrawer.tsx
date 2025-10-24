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
  Category,
} from "@/core/types";
import { AmountInput } from "./AmountInput";
import { NameInput } from "./NameInput";
import { FrequencyInput } from "./FrequencyInput";
import { CategoryInput } from "./CategoryInput";
import { NotesInput } from "./NotesInput";

interface EntryDrawerProps {
  isOpen: boolean;
  entry?: BudgetEntry | null;
  categories: Category[];
  onCancel: () => void;
  onSave: (input: BudgetEntryInput) => void;
  onClose: () => void;
  onDelete?: () => void;
}

export const EntryDrawer = ({
  isOpen,
  entry,
  categories,
  onCancel,
  onSave,
  onClose,
  onDelete,
}: EntryDrawerProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<BudgetEntryFrequency>("monthly");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState<string | undefined>();

  const isEditMode = Boolean(entry);
  const title = isEditMode ? "Edit Item" : "Add Item";

  useEffect(() => {
    if (!entry) {
      reset();
    } else {
      setName(entry.name);
      setAmount(entry.amount);
      setFrequency(entry.frequency);
      setCategoryId(entry.categoryId);
      setNotes(entry.notes);
    }
  }, [entry]);

  const reset = () => {
    setName("");
    setAmount(null);
    setFrequency("monthly");
    setCategoryId(undefined);
    setNotes(undefined);
  };

  const handleCancel = () => {
    onCancel();
    reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ name, amount, frequency, categoryId, notes });
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
            <CategoryInput
              categoryId={categoryId}
              categories={categories}
              onChange={setCategoryId}
            />
            <NotesInput notes={notes} onChange={setNotes} />
          </DrawerBody>
          <DrawerFooter>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <Button color="danger" variant="light" onPress={handleCancel}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Save
                </Button>
              </div>

              {isEditMode && (
                <div>
                  <Button
                    color="danger"
                    onPress={onDelete}
                    isIconOnly
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              )}
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
