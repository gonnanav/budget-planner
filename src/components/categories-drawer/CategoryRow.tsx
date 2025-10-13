import type { Category } from "@/core/types";

interface CategoryRowProps {
  category: Category;
  onClick: (category: Category) => void;
}

export const CategoryRow = ({ category, onClick }: CategoryRowProps) => {
  return (
    <div
      className="px-3 py-2 bg-gray-50 hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors duration-150 cursor-pointer"
      onClick={() => onClick(category)}
    >
      <span className="font-medium text-gray-800">{category.name}</span>
    </div>
  );
};
