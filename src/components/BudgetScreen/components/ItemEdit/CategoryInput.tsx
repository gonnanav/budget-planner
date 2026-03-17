import { Select } from "@mantine/core";

interface CategoryInputProps {
  selectedCategoryId: string | null;
  categoryOptions: { id: string; name: string }[];
  onCategoryChange: (categoryId: string | null) => void;
}

export const CategoryInput = ({
  selectedCategoryId,
  categoryOptions,
  onCategoryChange,
}: CategoryInputProps) => {
  const data = categoryOptions.map(({ id, name }) => ({ value: id, label: name }));

  return (
    <Select
      label="Category"
      data={data}
      value={selectedCategoryId}
      onChange={onCategoryChange}
    />
  );
};
