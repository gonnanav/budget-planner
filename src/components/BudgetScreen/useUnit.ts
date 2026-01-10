import { useState } from "react";
import type { Unit } from "core/types";

export type SelectedUnitResult = {
  value: Unit;
  selectItems: () => void;
  selectCategories: () => void;
};

export const useUnit = (initialUnit: Unit): SelectedUnitResult => {
  const [unit, setUnit] = useState<Unit>(initialUnit);

  const selectItems = () => {
    setUnit("item");
  };

  const selectCategories = () => {
    setUnit("category");
  };

  return {
    value: unit,
    selectItems,
    selectCategories,
  };
};
