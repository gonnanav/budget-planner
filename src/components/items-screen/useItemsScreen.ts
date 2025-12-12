import { useRouter } from "next/navigation";
import { useDisclosure } from "@heroui/react";
import { useDraft } from "@/components/shared";
import { ItemDraft } from "@/components/shared/types";
import { Category, Item } from "@/core/types";
import { enrichItem } from "@/core/items";
import { useLiveQuery } from "dexie-react-hooks";

const DEFAULT_ITEM_DRAFT: ItemDraft = {
  name: "",
  amount: null,
  frequency: "monthly",
  notes: "",
};

interface UseItemsScreenParams {
  basePath: string;
  db: {
    getItems: () => Promise<Item[]>;
    addItem: (draft: ItemDraft) => Promise<string>;
    updateItem: (id: string, draft: ItemDraft) => Promise<boolean>;
    deleteItem: (id: string) => Promise<void>;
    getCategories: () => Promise<Category[]>;
  };
}

export function useItemsScreen({ basePath, db }: UseItemsScreenParams) {
  const router = useRouter();
  const items = useLiveQuery(db.getItems) || [];
  const enrichedItems = items.map(enrichItem);
  const categories = useLiveQuery(db.getCategories) || [];
  const categoryOptions = categories.map(({ id, name }) => ({ id, name }));

  const { draft, updateDraft, resetDraft } =
    useDraft<ItemDraft>(DEFAULT_ITEM_DRAFT);

  const drawerHeadingText = draft.id ? "Edit Item" : "Add Item";

  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const startCreatingItem = () => {
    resetDraft();
    openDrawer();
  };

  const startEditingItem = (item: Item) => {
    updateDraft(item);
    openDrawer();
  };

  const saveItem = async (draftToSave: ItemDraft) => {
    if (draftToSave.id) {
      await db.updateItem(draftToSave.id, draftToSave);
    } else {
      await db.addItem(draftToSave);
    }

    closeDrawer();
  };

  const deleteItem = async (id?: string) => {
    if (!id) return;

    await db.deleteItem(id);
    closeDrawer();
  };

  const changeView = (view: string) => {
    router.push(`${basePath}/${view}`);
  };

  return {
    items: enrichedItems,
    isDrawerOpen,
    drawerHeadingText,
    draft,
    categoryOptions,
    startCreatingItem,
    startEditingItem,
    updateDraft,
    closeDrawer,
    saveItem,
    deleteItem,
    changeView,
  };
}
