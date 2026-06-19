import { Drawer } from "@mantine/core";
import type { EditState, ItemInput, CategoryInput } from "../types";
import { ItemForm } from "./ItemForm";
import { CategoryForm } from "./CategoryForm";
import { useMediaQuery } from "@mantine/hooks";

export type EditDrawerProps = {
  editState: EditState | null;
  categoryOptions: string[];
  onClose: () => void;
  onSaveItem: (values: ItemInput) => void;
  onDeleteItem: () => void;
  onSaveCategory: (values: CategoryInput) => void;
  onDeleteCategory: () => void;
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
  onSaveItem,
  onDeleteItem,
  onSaveCategory,
  onDeleteCategory,
}: EditDrawerProps) => {
  const opened = editState !== null;
  const headingText = getHeadingText(editState);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Drawer
      opened={opened}
      title={headingText}
      position="right"
      size={isDesktop ? "md" : "xs"}
      onClose={onClose}
    >
      {editState?.entity === "item" && (
        <ItemForm
          key={editState.mode === "update" ? editState.item.id : "create"}
          editState={editState}
          categoryOptions={categoryOptions}
          onSave={onSaveItem}
          onCancel={onClose}
          onDelete={onDeleteItem}
        />
      )}
      {editState?.entity === "category" && (
        <CategoryForm
          key={editState.name}
          editState={editState}
          onSave={onSaveCategory}
          onCancel={onClose}
          onDelete={onDeleteCategory}
        />
      )}
    </Drawer>
  );
};
