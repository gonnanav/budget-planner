import { TextInput } from "@mantine/core";
import { CHARACTER_LIMITS } from "lib/limits";

interface CategoryNameInputProps {
  name: string;
  onChange: (name: string) => void;
}

export function CategoryNameInput({ name, onChange }: CategoryNameInputProps) {
  return (
    <TextInput
      label="Name"
      value={name}
      onChange={(e) => onChange(e.currentTarget.value)}
      maxLength={CHARACTER_LIMITS.categoryName}
      required
    />
  );
}
