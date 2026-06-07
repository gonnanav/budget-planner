import { useState } from "react";
import type { Item, Category, EditState, Section } from "./types";

export type UseEditResult = {
  state: EditState | null;
  startCreateItem: (section: Section) => void;
  startUpdateItem: (section: Section, item: Item) => void;
  startUpdateCategory: (section: Section, category: Category) => void;
  stopEdit: () => void;
};

export function useEdit(): UseEditResult {
  const [state, setState] = useState<EditState | null>(null);

  const startCreateItem = (section: Section) => {
    setState({ entity: "item", mode: "create", section });
  };

  const startUpdateItem = (section: Section, item: Item) => {
    setState({ entity: "item", mode: "update", section, item });
  };

  const startUpdateCategory = (section: Section, category: Category) => {
    setState({ entity: "category", mode: "update", section, name: category.name, category });
  };

  const stopEdit = () => {
    setState(null);
  };

  return {
    state,
    startCreateItem,
    startUpdateItem,
    startUpdateCategory,
    stopEdit,
  };
}
