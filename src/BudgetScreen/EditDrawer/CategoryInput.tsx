import { Autocomplete } from "@mantine/core";

type CategoryInputProps = {
  selectedCategory: string;
  categoryOptions: string[];
  onCategoryChange: (category: string) => void;
};

export const CategoryInput = ({
  selectedCategory,
  categoryOptions,
  onCategoryChange,
}: CategoryInputProps) => {
  return (
    <Autocomplete
      label="Category"
      data={categoryOptions}
      value={selectedCategory}
      onChange={onCategoryChange}
    />
  );
};
