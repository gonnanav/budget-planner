import { ItemDraft } from "@/components/shared/types";
import { Category, Item } from "@/core/types";
import { useItemDrawer } from "./useItemDrawer";
import { useItemsData } from "./useItemsData";
import { useChangeSectionView } from "@/hooks/useChangeSectionView";

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
  const { items, categories } = useItemsData({
    getItems: db.getItems,
    getCategories: db.getCategories,
  });
  const { drawer, draft } = useItemDrawer(drawerHeadingTexts);

  const startCreatingItem = () => {
    draft.reset();
    drawer.open();
  };

  const startEditingItem = (item: Item) => {
    draft.update(item);
    drawer.open();
  };

  const saveItem = async (draftToSave: ItemDraft) => {
    if (draftToSave.id) {
      await db.updateItem(draftToSave.id, draftToSave);
    } else {
      await db.addItem(draftToSave);
    }

    drawer.close();
  };

  const deleteItem = async (id?: string) => {
    if (!id) return;

    await db.deleteItem(id);
    drawer.close();
  };

  return {
    items,
    isDrawerOpen: drawer.isOpen,
    drawerHeadingText: drawer.headingText,
    draft: draft.value,
    categoryOptions: categories,
    startCreatingItem,
    startEditingItem,
    updateDraft: draft.update,
    closeDrawer: drawer.close,
    saveItem,
    deleteItem,
    changeView,
  };
}
