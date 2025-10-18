import { Button } from "@heroui/button";
import { Plus } from "lucide-react";

interface AddButtonProps {
  onAdd: () => void;
  ariaLabel: string;
}

export function AddButton({ onAdd, ariaLabel }: AddButtonProps) {
  return (
    <Button
      size="sm"
      color="primary"
      onPress={onAdd}
      isIconOnly
      aria-label={ariaLabel}
    >
      <Plus size={16} />
    </Button>
  );
}
