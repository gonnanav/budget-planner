import { Input } from "@heroui/input";
import { CHARACTER_LIMITS } from "@/lib/limits";

interface CategoryNameInputProps {
  name: string;
  onChange: (name: string) => void;
}

export function CategoryNameInput({ name, onChange }: CategoryNameInputProps) {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Input
      label="Name"
      value={name}
      onValueChange={handleChange}
      maxLength={CHARACTER_LIMITS.categoryName}
      isRequired
    />
  );
}
