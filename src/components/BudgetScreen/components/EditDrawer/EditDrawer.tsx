import { Drawer } from "@mantine/core";
import { Trash2 } from "lucide-react";
import classes from "./EditDrawer.module.css";
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
      <div className={classes.content}>
        {children}
        <div className={classes.actions}>
          <div className={classes.actionsGroup}>
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
