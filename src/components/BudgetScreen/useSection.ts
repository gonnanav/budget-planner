import { useState } from "react";
import type { Section } from "core/types";
export type SelectedSection = Section | null;

export type SelectedSectionResult = {
  value: SelectedSection;
  toggleIncome: () => void;
  toggleExpenses: () => void;
};

export const useSection = (
  initialSection: SelectedSection,
): SelectedSectionResult => {
  const [section, setSection] = useState<SelectedSection>(initialSection);

  const toggleSection = (nextSection: Section) => {
    setSection((currentSection) =>
      currentSection === nextSection ? null : nextSection,
    );
  };

  const toggleIncome = () => {
    toggleSection("income");
  };

  const toggleExpenses = () => {
    toggleSection("expenses");
  };

  return {
    value: section,
    toggleIncome,
    toggleExpenses,
  };
};
