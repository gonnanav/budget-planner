import { Input } from "@heroui/input";
import { CHARACTER_LIMITS } from "@/lib/limits";

interface CategoryNameInputProps {
  name: string;
  onChange: (name: string) => void;
}

export function CategoryNameInput({ name, onChange }: CategoryNameInputProps) {
  return (
    <Input
      label="Category Name"
      placeholder="Enter category name"
      value={name}
      onChange={(e) => onChange(e.target.value)}
      isRequired
      maxLength={CHARACTER_LIMITS.categoryName}
    />
  );
}
