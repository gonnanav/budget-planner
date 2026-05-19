import { Autocomplete } from "@mantine/core";

type CategoryInputProps = {
  selectedCategory: string;
  categoryOptions: { id: string; name: string }[];
  onCategoryChange: (category: string) => void;
};

export const CategoryInput = ({
  selectedCategory,
  categoryOptions,
  onCategoryChange,
}: CategoryInputProps) => {
  const data = categoryOptions.map(({ name }) => name);
  const resolvedCategory = categoryOptions.find((c) => c.id === selectedCategory);
  const value = resolvedCategory ? resolvedCategory.name : selectedCategory;

  const handleChange = (inputValue: string) => {
    if (inputValue === "") {
      onCategoryChange("");

      return;
    }

    const match = categoryOptions.find(
      (c) => c.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (!match) throw new Error(`No category found for input: "${inputValue}"`);

    onCategoryChange(match.id);
  };

  return (
    <Autocomplete
      label="Category"
      data={data}
      value={value}
      onChange={handleChange}
    />
  );
};
