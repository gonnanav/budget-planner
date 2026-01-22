import { useState } from "react";
import type { ItemDraft, CategoryDraft } from "core/types";
import type { Section, Entity } from "core/types";

const DEFAULT_ITEM_DRAFT: ItemDraft = {
  name: "",
  amount: null,
  frequency: "monthly",
  notes: "",
  section: "income",
};

const DEFAULT_CATEGORY_DRAFT: CategoryDraft = { name: "", section: "income" };

type Mode = "create" | "update";

export type EditState = {
  mode: Mode | null;
  entity: Entity | null;
  itemDraft: ItemDraft;
  categoryDraft: CategoryDraft;
};

export type UseEntityEditResult = {
  mode: Mode | null;
  entity: Entity | null;
  section: Section | null;
  item: {
    draft: ItemDraft;
    startCreate: (section: Section) => void;
    startUpdate: (draft: ItemDraft) => void;
    updateDraft: (update: Partial<ItemDraft>) => void;
  };
  category: {
    draft: CategoryDraft;
    startCreate: (section: Section) => void;
    startUpdate: (draft: CategoryDraft) => void;
    updateDraft: (update: Partial<CategoryDraft>) => void;
  };
  clear: () => void;
};

export function useEntityEdit(): UseEntityEditResult {
  const [state, setState] = useState<EditState>({
    mode: null,
    entity: null,
    itemDraft: { ...DEFAULT_ITEM_DRAFT },
    categoryDraft: { ...DEFAULT_CATEGORY_DRAFT },
  });

  const startCreateItem = (section: Section) => {
    setState({
      mode: "create",
      entity: "item",
      itemDraft: { ...DEFAULT_ITEM_DRAFT, section },
      categoryDraft: { ...DEFAULT_CATEGORY_DRAFT },
    });
  };

  const startUpdateItem = (draft: ItemDraft) => {
    setState({
      mode: "update",
      entity: "item",
      itemDraft: draft,
      categoryDraft: { ...DEFAULT_CATEGORY_DRAFT },
    });
  };

  const updateItemDraft = (update: Partial<ItemDraft>) => {
    setState((prevState) => {
      return {
        ...prevState,
        itemDraft: { ...prevState.itemDraft, ...update },
      };
    });
  };

  const startCreateCategory = (section: Section) => {
    setState({
      mode: "create",
      entity: "category",
      itemDraft: { ...DEFAULT_ITEM_DRAFT },
      categoryDraft: { ...DEFAULT_CATEGORY_DRAFT, section },
    });
  };

  const startUpdateCategory = (draft: CategoryDraft) => {
    setState({
      mode: "update",
      entity: "category",
      itemDraft: { ...DEFAULT_ITEM_DRAFT },
      categoryDraft: draft,
    });
  };

  const updateCategoryDraft = (update: Partial<CategoryDraft>) => {
    setState((prevState) => {
      return {
        ...prevState,
        categoryDraft: { ...prevState.categoryDraft, ...update },
      };
    });
  };

  const clear = () => {
    setState({
      mode: null,
      entity: null,
      itemDraft: { ...DEFAULT_ITEM_DRAFT },
      categoryDraft: { ...DEFAULT_CATEGORY_DRAFT },
    });
  };

  const section =
    state.entity === "item"
      ? state.itemDraft.section
      : state.entity === "category"
        ? state.categoryDraft.section
        : null;

  return {
    mode: state.mode,
    entity: state.entity,
    section,
    item: {
      draft: state.itemDraft,
      startCreate: startCreateItem,
      startUpdate: startUpdateItem,
      updateDraft: updateItemDraft,
    },
    category: {
      draft: state.categoryDraft,
      startCreate: startCreateCategory,
      startUpdate: startUpdateCategory,
      updateDraft: updateCategoryDraft,
    },
    clear,
  };
}
