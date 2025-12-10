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
  headingText: string;
  draft: ItemDraft;
  categoryOptions: { id: string; name: string }[];
  onClose: () => void;
  onDraftChange: (changes: Partial<ItemDraft>) => void;
  onCancel: () => void;
  onSave: (draft: ItemDraft) => void;
  onDelete: (id?: string) => void;
}

export const ItemDrawer = ({
  isOpen,
  categoryOptions,
  headingText,
  draft,
  onDraftChange,
  onCancel,
  onSave,
  onClose,
  onDelete,
}: ItemDrawerProps) => {
  const hasDelete = Boolean(draft.id);

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

  const handleDelete = () => {
    onDelete(draft.id);
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>{headingText}</DrawerHeader>
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
            hasDelete={hasDelete}
            onCancel={onCancel}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
