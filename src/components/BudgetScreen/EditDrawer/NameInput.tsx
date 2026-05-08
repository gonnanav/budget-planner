import { TextInput } from "@mantine/core";
import { characterLimits } from "@/domain/budget";

type NameInputProps = {
  name: string;
  onNameChange: (name: string) => void;
};

export function NameInput({ name, onNameChange }: NameInputProps) {
  return (
    <TextInput
      label="Name"
      value={name}
      onChange={(e) => onNameChange(e.currentTarget.value)}
      maxLength={characterLimits.itemName}
      required
    />
  );
}
