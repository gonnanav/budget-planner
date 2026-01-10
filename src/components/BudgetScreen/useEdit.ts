import { useState } from "react";
import type { ItemDraft, CategoryDraft } from "components/shared/types";
import type { Section, Unit } from "core/types";

const DEFAULT_ITEM_DRAFT: ItemDraft = {
  name: "",
  amount: null,
  frequency: "monthly",
  notes: "",
};

const DEFAULT_CATEGORY_DRAFT: CategoryDraft = { name: "" };

type Mode = "create" | "update";

export type EditState = {
  mode: Mode | null;
  unit: Unit | null;
  section: Section | null;
  itemDraft: ItemDraft;
  categoryDraft: CategoryDraft;
};

export type UseEditResult = {
  mode: Mode | null;
  unit: Unit | null;
  section: Section | null;
  item: {
    draft: ItemDraft;
    startCreate: (section: Section) => void;
    startUpdate: (section: Section, draft: ItemDraft) => void;
    updateDraft: (update: Partial<ItemDraft>) => void;
  };
  category: {
    draft: CategoryDraft;
    startCreate: (section: Section) => void;
    startUpdate: (section: Section, draft: CategoryDraft) => void;
    updateDraft: (update: Partial<CategoryDraft>) => void;
  };
  clear: () => void;
};

export function useEdit(): UseEditResult {
  const [state, setState] = useState<EditState>({
    mode: null,
    unit: null,
    section: null,
    itemDraft: { ...DEFAULT_ITEM_DRAFT },
    categoryDraft: { ...DEFAULT_CATEGORY_DRAFT },
  });

  const startCreateItem = (section: Section) => {
    setState({
      mode: "create",
      unit: "item",
      section,
      itemDraft: { ...DEFAULT_ITEM_DRAFT },
      categoryDraft: { ...DEFAULT_CATEGORY_DRAFT },
    });
  };

  const startUpdateItem = (section: Section, draft: ItemDraft) => {
    setState({
      mode: "update",
      unit: "item",
      section,
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
      unit: "category",
      section,
      itemDraft: { ...DEFAULT_ITEM_DRAFT },
      categoryDraft: { ...DEFAULT_CATEGORY_DRAFT },
    });
  };

  const startUpdateCategory = (section: Section, draft: CategoryDraft) => {
    setState({
      mode: "update",
      unit: "category",
      section,
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
      unit: null,
      section: null,
      itemDraft: { ...DEFAULT_ITEM_DRAFT },
      categoryDraft: { ...DEFAULT_CATEGORY_DRAFT },
    });
  };

  return {
    mode: state.mode,
    unit: state.unit,
    section: state.section,
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
