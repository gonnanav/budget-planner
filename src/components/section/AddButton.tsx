import { Button } from "@heroui/button";
import { Plus } from "lucide-react";

interface AddButtonProps {
  label: string;
  onClick: () => void;
}

export function AddButton({ label, onClick }: AddButtonProps) {
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
