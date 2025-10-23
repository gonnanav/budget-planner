import { Button } from "@heroui/button";
import { Plus } from "lucide-react";

interface AddButtonProps {
  label: string;
  onAdd: () => void;
}

export function AddButton({ label, onAdd }: AddButtonProps) {
  return (
    <Button
      size="sm"
      color="primary"
      onPress={onAdd}
      aria-label={label}
      isIconOnly
    >
      <Plus size={16} />
    </Button>
  );
}
