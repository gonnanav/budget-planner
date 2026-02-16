import { ActionIcon } from "@mantine/core";
import { Plus } from "lucide-react";
import type { Entity } from "domain/types";

interface AddButtonProps {
  entity: Entity;
  onClick: () => void;
}

export function AddButton({ entity, onClick }: AddButtonProps) {
  const label = entity === "item" ? "Add Item" : "Add Category";

  return (
    <ActionIcon
      size="sm"
      aria-label={label}
      onClick={onClick}
    >
      <Plus size={16} />
    </ActionIcon>
  );
}
