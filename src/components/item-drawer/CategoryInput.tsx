import { Select, SelectItem } from "@heroui/select";
import type { Selection } from "@heroui/react";

interface CategoryInputProps {
  selectedCategoryId?: string;
  categoryOptions: { id: string; name: string }[];
  onCategoryChange: (categoryId?: string) => void;
}

export const CategoryInput = ({
  selectedCategoryId,
  categoryOptions,
  onCategoryChange,
}: CategoryInputProps) => {
  const selectedKeys = selectedCategoryId ? [selectedCategoryId] : [];

  const handleSelectionChange = (keys: Selection) => {
    const selectedKey = Array.from(keys)[0];
    onCategoryChange(selectedKey?.toString());
  };

  return (
    <Select
      label="Category"
      placeholder="Select a category"
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
    >
      {categoryOptions.map(({ id, name }) => (
        <SelectItem key={id}>{name}</SelectItem>
      ))}
    </Select>
  );
};
