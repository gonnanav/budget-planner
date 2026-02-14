import type { CategoryDraft } from "core/types";
import { CategoryNameInput } from "./CategoryNameInput";

export interface CategoryEditProps {
  draft: CategoryDraft;
  onDraftChange: (changes: Partial<CategoryDraft>) => void;
}

export const CategoryEdit = ({ draft, onDraftChange }: CategoryEditProps) => {
  const handleNameChange = (name: string) => {
    onDraftChange({ name });
  };

  return <CategoryNameInput name={draft.name} onChange={handleNameChange} />;
};
