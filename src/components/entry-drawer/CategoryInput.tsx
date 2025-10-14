import { Select, SelectItem } from "@heroui/select";
import { Category } from "@/core/types";

interface CategoryInputProps {
  categoryId?: string;
  categories: Category[];
  onChange: (categoryId: string | undefined) => void;
}

export const CategoryInput = ({
  categoryId,
  categories,
  onChange,
}: CategoryInputProps) => {
  const selectedKeys = categoryId ? [categoryId] : [];

  return (
    <Select
      label="Category"
      placeholder="Select a category"
      selectedKeys={selectedKeys}
      onSelectionChange={(keys) => {
        const selectedKey = Array.from(keys)[0];
        onChange(selectedKey as string | undefined);
      }}
    >
      {categories.map((category) => (
        <SelectItem key={category.id}>{category.name}</SelectItem>
      ))}
    </Select>
  );
};
