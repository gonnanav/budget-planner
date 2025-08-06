import type { Frequency, ItemInput } from "../types";
import { AmountInput } from "./AmountInput";
import { NameInput } from "./NameInput";
import { FrequencyInput } from "./FrequencyInput";
import { CategoryInput } from "./CategoryInput";
import { NotesInput } from "./NotesInput";
import classes from "./ItemEdit.module.css";

export type ItemEditProps = {
  draft: ItemInput;
  categoryOptions: { id: string; name: string }[];
  onDraftChange: (changes: Partial<ItemInput>) => void;
};

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
  const handleCategoryIdChange = (categoryId: string | null) =>
    onDraftChange({ categoryId });
  const handleNotesChange = (notes: string) => onDraftChange({ notes });

  return (
    <div className={classes.root}>
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
        selectedCategoryId={draft.categoryId ?? null}
        categoryOptions={categoryOptions}
        onCategoryChange={handleCategoryIdChange}
      />
      <NotesInput notes={draft.notes ?? ""} onNotesChange={handleNotesChange} />
    </div>
  );
};
