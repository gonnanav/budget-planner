import { Select } from "@mantine/core";

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
  const data = categoryOptions.map(({ id, name }) => ({ value: id, label: name }));

  const handleChange = (value: string | null) => {
    onCategoryChange(value ?? undefined);
  };

  return (
    <Select
      label="Category"
      data={data}
      value={selectedCategoryId ?? null}
      onChange={handleChange}
    />
  );
};
