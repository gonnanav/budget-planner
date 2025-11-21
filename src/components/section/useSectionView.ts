import { useState } from "react";

type SectionView = "items" | "categories";

interface UseSectionViewProps {
  addItemButtonLabel: string;
  addCategoryButtonLabel: string;
  onAddItemClick: () => void;
  onAddCategoryClick: () => void;
}

export function useSectionView({
  addItemButtonLabel,
  addCategoryButtonLabel,
  onAddItemClick,
  onAddCategoryClick,
}: UseSectionViewProps) {
  const [view, setView] = useState<SectionView>("items");

  const { addButtonLabel, handleAddButtonClick } =
    view === "items"
      ? {
          addButtonLabel: addItemButtonLabel,
          handleAddButtonClick: onAddItemClick,
        }
      : {
          addButtonLabel: addCategoryButtonLabel,
          handleAddButtonClick: onAddCategoryClick,
        };

  return {
    view,
    handleViewChange: setView,
    addButtonLabel,
    handleAddButtonClick,
  };
}
