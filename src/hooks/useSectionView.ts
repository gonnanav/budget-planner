import { useState } from "react";

type view = "items" | "categories";

interface useSectionViewProps {
  addItemLabel: string;
  addCategoryLabel: string;
  onAddItem: () => void;
  onAddCategory: () => void;
}

export function useSectionView({
  addItemLabel,
  addCategoryLabel,
  onAddItem,
  onAddCategory,
}: useSectionViewProps) {
  const [view, setView] = useState<view>("items");

  const handleAdd = () => {
    if (view === "items") {
      onAddItem();
    } else if (view === "categories") {
      onAddCategory();
    }
  };

  const addButtonLabel = view === "items" ? addItemLabel : addCategoryLabel;

  return {
    view,
    addButtonLabel,
    onChangeView: setView,
    onAdd: handleAdd,
  };
}
