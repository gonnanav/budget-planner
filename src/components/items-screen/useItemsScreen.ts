import { ItemDraft } from "@/components/shared/types";
import { Category, Item } from "@/core/types";
import { useItemDrawer } from "./useItemDrawer";
import { useItemsData } from "./useItemsData";
import { useChangeSectionView } from "@/hooks/useChangeSectionView";
import { getItemActions } from "./item-actions";

interface UseItemsScreenParams {
  basePath: string;
  drawerHeadingTexts: { create: string; edit: string };
  db: {
    getItems: () => Promise<Item[]>;
    addItem: (draft: ItemDraft) => Promise<string>;
    updateItem: (id: string, draft: ItemDraft) => Promise<boolean>;
    deleteItem: (id: string) => Promise<void>;
    getCategories: () => Promise<Category[]>;
  };
}

export function useItemsScreen({
  basePath,
  drawerHeadingTexts,
  db,
}: UseItemsScreenParams) {
  const { changeView } = useChangeSectionView(basePath);
  const data = useItemsData({
    getItems: db.getItems,
    getCategories: db.getCategories,
  });
  const { drawer, draft } = useItemDrawer(drawerHeadingTexts);
  const actions = getItemActions({ db, drawer, draft });

  return { data, drawer, draft, actions, changeView };
}
