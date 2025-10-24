import { Input } from "@heroui/input";
import { CHARACTER_LIMITS } from "@/lib/limits";

interface NameInputProps {
  name: string;
  className?: string;
  onChange: (name: string) => void;
}

export function NameInput({ name, className, onChange }: NameInputProps) {
  return (
    <Input
      label="Name"
      value={name}
      className={className}
      onValueChange={onChange}
      maxLength={CHARACTER_LIMITS.itemName}
    />
  );
}
