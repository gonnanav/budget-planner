import type { CategoryDraft } from "domain/types";
import { CategoryNameInput } from "./CategoryNameInput";
import classes from "./CategoryEdit.module.css";

export interface CategoryEditProps {
  draft: CategoryDraft;
  onDraftChange: (changes: Partial<CategoryDraft>) => void;
}

export const CategoryEdit = ({ draft, onDraftChange }: CategoryEditProps) => {
  const handleNameChange = (name: string) => {
    onDraftChange({ name });
  };

  return (
    <div className={classes.root}>
      <CategoryNameInput name={draft.name} onChange={handleNameChange} />
    </div>
  );
};
