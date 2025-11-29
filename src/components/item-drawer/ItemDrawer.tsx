import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { ItemInput, Frequency, Category } from "@/core/types";
import { ActionButtons } from "@/components/action-buttons";
import { AmountInput } from "./AmountInput";
import { NameInput } from "./NameInput";
import { FrequencyInput } from "./FrequencyInput";
import { CategoryInput } from "./CategoryInput";
import { NotesInput } from "./NotesInput";

export interface ItemDrawerProps {
  isOpen: boolean;
  categories: Category[];
  name: string;
  amount: number | null;
  frequency: Frequency;
  categoryId: string | undefined;
  notes: string | undefined;
  heading: string;
  onNameChange: (name: string) => void;
  onAmountChange: (amount: number | null) => void;
  onFrequencyChange: (frequency: Frequency) => void;
  onCategoryIdChange: (categoryId: string | undefined) => void;
  onNotesChange: (notes: string | undefined) => void;
  onCancel: () => void;
  onSave: (input: ItemInput) => void;
  onClose: () => void;
  onDelete?: () => void;
}

export const ItemDrawer = ({
  isOpen,
  categories,
  name,
  amount,
  frequency,
  categoryId,
  notes,
  heading,
  onNameChange,
  onAmountChange,
  onFrequencyChange,
  onCategoryIdChange,
  onNotesChange,
  onCancel,
  onSave,
  onClose,
  onDelete,
}: ItemDrawerProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ name, amount, frequency, categoryId, notes });
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <DrawerHeader>{heading}</DrawerHeader>
          <DrawerBody>
            <NameInput name={name} onNameChange={onNameChange} />
            <AmountInput amount={amount} onAmountChange={onAmountChange} />
            <FrequencyInput
              frequency={frequency}
              onFrequencyChange={onFrequencyChange}
            />
            <CategoryInput
              selectedCategoryId={categoryId}
              categoryOptions={categories}
              onCategoryChange={onCategoryIdChange}
            />
            <NotesInput notes={notes} onNotesChange={onNotesChange} />
          </DrawerBody>
          <DrawerFooter>
            <ActionButtons onCancel={onCancel} onDelete={onDelete} />
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
