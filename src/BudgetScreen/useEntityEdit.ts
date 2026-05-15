import { useState } from "react";
import type { ItemDraft, CategoryDraft, EditState, Section } from "./types";

const DEFAULT_ITEM_DRAFT: Partial<ItemDraft> = {
  name: "",
  amount: null,
  frequency: "monthly",
  notes: "",
};

const DEFAULT_CATEGORY_DRAFT: Partial<CategoryDraft> = { name: "" };

export type UseEntityEditResult = {
  state: EditState | null;
  startCreateItem: (section: Section) => void;
  startUpdateItem: (section: Section, draft: ItemDraft) => void;
  updateItemDraft: (update: Partial<ItemDraft>) => void;
  startCreateCategory: (section: Section) => void;
  startUpdateCategory: (section: Section, draft: CategoryDraft) => void;
  updateCategoryDraft: (update: Partial<CategoryDraft>) => void;
  stopEdit: () => void;
};

export function useEntityEdit(): UseEntityEditResult {
  const [state, setState] = useState<EditState | null>(null);

  const startCreateItem = (section: Section) => {
    setState({
      mode: "create",
      section,
      entity: "item",
      draft: DEFAULT_ITEM_DRAFT as ItemDraft,
    });
  };

  const startUpdateItem = (section: Section, draft: ItemDraft) => {
    setState({
      mode: "update",
      section,
      entity: "item",
      draft,
    });
  };

  const updateItemDraft = (update: Partial<ItemDraft>) => {
    setState((prevState) => {
      if (prevState?.entity !== "item") return prevState;

      return {
        ...prevState,
        draft: { ...prevState.draft, ...update },
      };
    });
  };

  const startCreateCategory = (section: Section) => {
    setState({
      mode: "create",
      section,
      entity: "category",
      draft: DEFAULT_CATEGORY_DRAFT as CategoryDraft,
    });
  };

  const startUpdateCategory = (section: Section, draft: CategoryDraft) => {
    setState({
      mode: "update",
      section,
      entity: "category",
      draft,
    });
  };

  const updateCategoryDraft = (update: Partial<CategoryDraft>) => {
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
    startCreateCategory,
    startUpdateCategory,
    updateItemDraft,
    updateCategoryDraft,
    stopEdit,
  };
}
