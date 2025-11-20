import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { BudgetItem, BudgetItemInput, Frequency, Category } from "@/core/types";
import { ActionButtons } from "@/components/action-buttons";
import { AmountInput } from "./AmountInput";
import { NameInput } from "./NameInput";
import { FrequencyInput } from "./FrequencyInput";
import { CategoryInput } from "./CategoryInput";
import { NotesInput } from "./NotesInput";

export interface ItemDrawerProps {
  isOpen: boolean;
  item?: BudgetItem | null;
  categories: Category[];
  onCancel: () => void;
  onSave: (input: BudgetItemInput) => void;
  onClose: () => void;
  onDelete: () => void;
}

export const ItemDrawer = ({
  isOpen,
  item,
  categories,
  onCancel,
  onSave,
  onClose,
  onDelete,
}: ItemDrawerProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState<string | undefined>();

  const isEditMode = Boolean(item);
  const title = isEditMode ? "Edit Item" : "Add Item";

  useEffect(() => {
    if (!item) {
      reset();
    } else {
      setName(item.name);
      setAmount(item.amount);
      setFrequency(item.frequency);
      setCategoryId(item.categoryId);
      setNotes(item.notes);
    }
  }, [item]);

  const reset = () => {
    setName("");
    setAmount(null);
    setFrequency("monthly");
    setCategoryId(undefined);
    setNotes(undefined);
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
            <ActionButtons
              onCancel={onCancel}
              onDelete={isEditMode ? onDelete : undefined}
            />
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
