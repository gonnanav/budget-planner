import { useState } from "react";
import type { Section } from "domain/types";

export type ActiveSection = Section | null;

export type UseActiveSectionResult = {
  activeSection: ActiveSection;
  toggleIncome: () => void;
  toggleExpenses: () => void;
};

export const useActiveSection = (
  initialActiveSection: ActiveSection = null,
): UseActiveSectionResult => {
  const [activeSection, setActiveSection] = useState(initialActiveSection);

  const toggleSection = (section: Section) => {
    setActiveSection((prevSection) =>
      prevSection === section ? null : section,
    );
  };

  const toggleIncome = () => {
    toggleSection("income");
  };

  const toggleExpenses = () => {
    toggleSection("expenses");
  };

  return {
    activeSection,
    toggleIncome,
    toggleExpenses,
  };
};
