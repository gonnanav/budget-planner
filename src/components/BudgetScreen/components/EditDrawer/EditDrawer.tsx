import { Drawer } from "@mantine/core";
import { ActionButtons } from "./ActionButtons";
import type { ReactNode } from "react";
import type { Section, Entity } from "domain/types";

type Mode = "create" | "update";

export interface EditDrawerProps {
  isOpen: boolean;
  mode: Mode | null;
  entity: Entity | null;
  section: Section | null;
  onClose: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
  children: ReactNode;
}

const getHeadingText = (
  mode: Mode | null,
  entity: Entity | null,
  section: Section | null,
) => {
  if (!mode || !entity || !section) return "Edit";

  const modeText = mode === "create" ? "Add" : "Edit";
  const sectionText = section === "income" ? "Income" : "Expenses";
  const entityText = entity === "item" ? "Item" : "Category";

  return `${modeText} ${sectionText} ${entityText}`;
};

export const EditDrawer = ({
  isOpen,
  mode,
  entity,
  section,
  onClose,
  onCancel,
  onSave,
  onDelete,
  children,
}: EditDrawerProps) => {
  const headingText = getHeadingText(mode, entity, section);
  const hasDelete = mode === "update";

  return (
    <Drawer opened={isOpen} onClose={onClose} title={headingText} position="right">
      {children}
      <ActionButtons
        hasDelete={hasDelete}
        onCancel={onCancel}
        onSave={onSave}
        onDelete={onDelete}
      />
    </Drawer>
  );
};
