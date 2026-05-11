import { Drawer } from "@mantine/core";
import { Trash2 } from "lucide-react";
import classes from "./EditDrawer.module.css";
import { ItemEdit } from "./ItemEdit";
import { CategoryEdit } from "./CategoryEdit";
import type { EditState, ItemDraft, CategoryDraft } from "../types";

export type EditDrawerProps = {
  editState: EditState | null;
  categoryOptions: { id: string; name: string }[];
  onClose: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
  onItemDraftChange: (update: Partial<ItemDraft>) => void;
  onCategoryDraftChange: (update: Partial<CategoryDraft>) => void;
};

const getHeadingText = (editState: EditState | null) => {
  if (!editState) return "Edit";

  const modeText = editState.mode === "create" ? "Add" : "Edit";
  const sectionText = editState.section === "income" ? "Income" : "Expenses";
  const entityText = editState.entity === "item" ? "Item" : "Category";

  return `${modeText} ${sectionText} ${entityText}`;
};

export const EditDrawer = ({
  editState,
  categoryOptions,
  onClose,
  onCancel,
  onSave,
  onDelete,
  onItemDraftChange,
  onCategoryDraftChange,
}: EditDrawerProps) => {
  const opened = editState !== null;
  const headingText = getHeadingText(editState);
  const hasDelete = editState?.mode === "update";

  return (
    <Drawer opened={opened} onClose={onClose} title={headingText} position="right">
      <div className={classes.body}>
        {editState?.entity === "item" && (
          <ItemEdit
            draft={editState.draft}
            categoryOptions={categoryOptions}
            onDraftChange={onItemDraftChange}
          />
        )}
        {editState?.entity === "category" && (
          <CategoryEdit
            draft={editState.draft}
            onDraftChange={onCategoryDraftChange}
          />
        )}
        <div className={classes.actions}>
          <div className={classes.primaryActions}>
            <button className={classes.cancel} onClick={onCancel}>
              Cancel
            </button>
            <button className={classes.save} type="submit" onClick={onSave}>
              Save
            </button>
          </div>

          {hasDelete && (
            <button
              className={classes.delete}
              onClick={onDelete}
              aria-label="Delete"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>
    </Drawer>
  );
};
