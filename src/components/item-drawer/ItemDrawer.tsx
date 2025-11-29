import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Frequency } from "@/core/types";
import { ItemDraft } from "@/components/shared/types";
import { ActionButtons } from "@/components/action-buttons";
import { AmountInput } from "./AmountInput";
import { NameInput } from "./NameInput";
import { FrequencyInput } from "./FrequencyInput";
import { CategoryInput } from "./CategoryInput";
import { NotesInput } from "./NotesInput";

export interface ItemDrawerProps {
  isOpen: boolean;
  heading: string;
  draft: ItemDraft;
  categoryOptions: { id: string; name: string }[];
  onClose: () => void;
  onDraftChange: (changes: Partial<ItemDraft>) => void;
  onCancel: () => void;
  onSave: (draft: ItemDraft) => void;
  onDelete?: () => void;
}

export const ItemDrawer = ({
  isOpen,
  categoryOptions,
  heading,
  draft,
  onDraftChange,
  onCancel,
  onSave,
  onClose,
  onDelete,
}: ItemDrawerProps) => {
  const handleNameChange = (name: string) => onDraftChange({ name });
  const handleAmountChange = (amount: number | null) =>
    onDraftChange({ amount });
  const handleFrequencyChange = (frequency: Frequency) =>
    onDraftChange({ frequency });
  const handleCategoryIdChange = (categoryId?: string) =>
    onDraftChange({ categoryId });
  const handleNotesChange = (notes: string) => onDraftChange({ notes });

  const handleSave = () => {
    onSave(draft);
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>{heading}</DrawerHeader>
        <DrawerBody>
          <NameInput name={draft.name} onNameChange={handleNameChange} />
          <AmountInput
            amount={draft.amount ?? null}
            onAmountChange={handleAmountChange}
          />
          <FrequencyInput
            frequency={draft.frequency ?? "monthly"}
            onFrequencyChange={handleFrequencyChange}
          />
          <CategoryInput
            selectedCategoryId={draft.categoryId}
            categoryOptions={categoryOptions}
            onCategoryChange={handleCategoryIdChange}
          />
          <NotesInput notes={draft.notes} onNotesChange={handleNotesChange} />
        </DrawerBody>
        <DrawerFooter>
          <ActionButtons
            onCancel={onCancel}
            onSave={handleSave}
            onDelete={onDelete}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
