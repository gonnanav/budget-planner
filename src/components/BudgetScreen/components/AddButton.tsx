import { Button } from "@heroui/button";
import { Plus } from "lucide-react";
import type { Entity } from "core/types";

interface AddButtonProps {
  entity: Entity;
  onClick: () => void;
}

export function AddButton({ entity, onClick }: AddButtonProps) {
  const label = entity === "item" ? "Add Item" : "Add Category";

  return (
    <Button
      size="sm"
      color="primary"
      onPress={onClick}
      aria-label={label}
      isIconOnly
    >
      <Plus size={16} />
    </Button>
  );
}
