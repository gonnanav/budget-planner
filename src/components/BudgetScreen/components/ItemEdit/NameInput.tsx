import { TextInput } from "@mantine/core";
import { CHARACTER_LIMITS } from "domain/limits";

interface NameInputProps {
  name: string;
  onNameChange: (name: string) => void;
}

export function NameInput({ name, onNameChange }: NameInputProps) {
  return (
    <TextInput
      label="Name"
      value={name}
      onChange={(e) => onNameChange(e.currentTarget.value)}
      maxLength={CHARACTER_LIMITS.itemName}
      required
    />
  );
}
