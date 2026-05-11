import { TextInput } from "@mantine/core";
import { characterLimits } from "../budget";

type CategoryNameInputProps = {
  name: string;
  onChange: (name: string) => void;
};

export function CategoryNameInput({ name, onChange }: CategoryNameInputProps) {
  return (
    <TextInput
      label="Name"
      value={name}
      onChange={(e) => onChange(e.currentTarget.value)}
      maxLength={characterLimits.categoryName}
      required
    />
  );
}
