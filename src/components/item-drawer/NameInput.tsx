import { Input } from "@heroui/input";
import { CHARACTER_LIMITS } from "@/lib/limits";

interface NameInputProps {
  name: string;
  onNameChange: (name: string) => void;
}

export function NameInput({ name, onNameChange }: NameInputProps) {
  return (
    <Input
      label="Name"
      value={name}
      onValueChange={onNameChange}
      maxLength={CHARACTER_LIMITS.itemName}
    />
  );
}
