import { useState } from "react";

type SectionView = "items" | "categories";

export function useSectionView() {
  const [view, setView] = useState<SectionView>("items");

  return {
    view,
    handleViewChange: setView,
  };
}
