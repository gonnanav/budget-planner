import { Plus } from "lucide-react";
import type { Entity } from "domain/types";
import classes from "./AddButton.module.css";

interface AddButtonProps {
  entity: Entity;
  onClick: () => void;
}

export function AddButton({ entity, onClick }: AddButtonProps) {
  const label = entity === "item" ? "Add Item" : "Add Category";

  return (
    <button className={classes.addButton} aria-label={label} onClick={onClick}>
      <Plus size={16} />
    </button>
  );
}
