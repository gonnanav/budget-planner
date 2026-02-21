import type { Frequency } from "domain/types";
import type { ItemDraft } from "domain/types";
import { AmountInput } from "./AmountInput";
import { NameInput } from "./NameInput";
import { FrequencyInput } from "./FrequencyInput";
import { CategoryInput } from "./CategoryInput";
import { NotesInput } from "./NotesInput";
import styles from "./ItemEdit.module.css";

export interface ItemEditProps {
  draft: ItemDraft;
  categoryOptions: { id: string; name: string }[];
  onDraftChange: (changes: Partial<ItemDraft>) => void;
}

export const ItemEdit = ({
  draft,
  categoryOptions,
  onDraftChange,
}: ItemEditProps) => {
  const handleNameChange = (name: string) => onDraftChange({ name });
  const handleAmountChange = (amount: number | null) =>
    onDraftChange({ amount });
  const handleFrequencyChange = (frequency: Frequency) =>
    onDraftChange({ frequency });
  const handleCategoryIdChange = (categoryId?: string) =>
    onDraftChange({ categoryId });
  const handleNotesChange = (notes: string) => onDraftChange({ notes });

  return (
    <div className={styles.root}>
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
    </div>
  );
};
