import { useState } from "react";
import type { Item, ItemInput, Category, CategoryInput, EditState, Section } from "./types";

const DEFAULT_ITEM_DRAFT: ItemInput = {
  name: "",
  amount: null,
  frequency: "monthly",
  notes: "",
};

const DEFAULT_CATEGORY_DRAFT: CategoryInput = { name: "" };

export type UseEntityEditResult = {
  state: EditState | null;
  startCreateItem: (section: Section) => void;
  startUpdateItem: (section: Section, item: Item) => void;
  updateItemDraft: (update: Partial<ItemInput>) => void;
  startCreateCategory: (section: Section) => void;
  startUpdateCategory: (section: Section, category: Category) => void;
  updateCategoryDraft: (update: Partial<CategoryInput>) => void;
  stopEdit: () => void;
};

export function useEntityEdit(): UseEntityEditResult {
  const [state, setState] = useState<EditState | null>(null);

  const startCreateItem = (section: Section) => {
    setState({ entity: "item", mode: "create", section, draft: DEFAULT_ITEM_DRAFT });
  };

  const startUpdateItem = (section: Section, item: Item) => {
    setState({ entity: "item", mode: "update", section, id: item.id, draft: item });
  };

  const updateItemDraft = (update: Partial<ItemInput>) => {
    setState((prevState) => {
      if (prevState?.entity !== "item") return prevState;

      return {
        ...prevState,
        draft: { ...prevState.draft, ...update },
      };
    });
  };

  const startCreateCategory = (section: Section) => {
    setState({ entity: "category", mode: "create", section, draft: DEFAULT_CATEGORY_DRAFT });
  };

  const startUpdateCategory = (section: Section, category: Category) => {
    setState({ entity: "category", mode: "update", section, id: category.id, draft: category });
  };

  const updateCategoryDraft = (update: Partial<CategoryInput>) => {
    setState((prevState) => {
      if (prevState?.entity !== "category") return prevState;

      return {
        ...prevState,
        draft: { ...prevState.draft, ...update },
      };
    });
  };

  const stopEdit = () => {
    setState(null);
  };

  return {
    state,
    startCreateItem,
    startUpdateItem,
    updateItemDraft,
    startCreateCategory,
    startUpdateCategory,
    updateCategoryDraft,
    stopEdit,
  };
}
