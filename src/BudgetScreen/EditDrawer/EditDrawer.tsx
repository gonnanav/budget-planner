import { ActionIcon, Button, Drawer } from "@mantine/core";
import { Trash2 } from "lucide-react";
import classes from "./EditDrawer.module.css";
import { ItemEdit } from "./ItemEdit";
import { CategoryEdit } from "./CategoryEdit";
import type { EditState, ItemInput, CategoryInput } from "../types";

export type EditDrawerProps = {
  editState: EditState | null;
  categoryOptions: string[];
  onClose: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
  onItemDraftChange: (update: Partial<ItemInput>) => void;
  onCategoryDraftChange: (update: Partial<CategoryInput>) => void;
};

const getHeadingText = (editState: EditState | null) => {
  if (!editState) return "Edit";

  const modeText = editState.mode === "create" ? "Add" : "Edit";
  const sectionText = editState.section === "income" ? "Income" : "Expense";
  const entityText = editState.entity === "category" ? " Category" : "";

  return `${modeText} ${sectionText}${entityText}`;
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
    <Drawer opened={opened} title={headingText} position="right" size="xs" onClose={onClose}>
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
            <Button variant="default" onClick={onCancel}>Cancel</Button>
            <Button onClick={onSave}>Save</Button>
          </div>

          {hasDelete && (
            <ActionIcon variant="subtle" color="red" size="lg" onClick={onDelete} aria-label="Delete">
              <Trash2 size={20} />
            </ActionIcon>
          )}
        </div>
      </div>
    </Drawer>
  );
};
