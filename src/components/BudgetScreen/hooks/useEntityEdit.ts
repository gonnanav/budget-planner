import { useState } from "react";
import type { ItemDraft, CategoryDraft } from "core/types";
import type { Section } from "core/types";

const DEFAULT_ITEM_DRAFT: Partial<ItemDraft> = {
  name: "",
  amount: null,
  frequency: "monthly",
  notes: "",
};

const DEFAULT_CATEGORY_DRAFT: Partial<CategoryDraft> = { name: "" };

type Mode = "create" | "update";

export type EditState =
  | {
    mode: Mode;
    entity: "item";
    draft: ItemDraft;
  }
  | {
    mode: Mode;
    entity: "category";
    draft: CategoryDraft;
  };

export type UseEntityEditResult = {
  state: EditState | null;
  actions: {
    startCreateItem: (section: Section) => void;
    startUpdateItem: (draft: ItemDraft) => void;
    updateItemDraft: (update: Partial<ItemDraft>) => void;
    startCreateCategory: (section: Section) => void;
    startUpdateCategory: (draft: CategoryDraft) => void;
    updateCategoryDraft: (update: Partial<CategoryDraft>) => void;
    stopEdit: () => void;
  };
};

export function useEntityEdit(): UseEntityEditResult {
  const [state, setState] = useState<EditState | null>(null);

  const startCreateItem = (section: Section) => {
    setState({
      mode: "create",
      entity: "item",
      draft: { ...DEFAULT_ITEM_DRAFT, section } as ItemDraft,
    });
  };

  const startUpdateItem = (draft: ItemDraft) => {
    setState({
      mode: "update",
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
      entity: "category",
      draft: { ...DEFAULT_CATEGORY_DRAFT, section } as CategoryDraft,
    });
  };

  const startUpdateCategory = (draft: CategoryDraft) => {
    setState({
      mode: "update",
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
    actions: {
      startCreateItem,
      startUpdateItem,
      startCreateCategory,
      startUpdateCategory,
      updateItemDraft,
      updateCategoryDraft,
      stopEdit,
    },
  };
}
