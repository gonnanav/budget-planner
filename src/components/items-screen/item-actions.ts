import { ItemDraft } from "@/components/shared/types";
import { Item } from "@/core/types";

interface GetItemActionsParams {
  db: {
    addItem: (draft: ItemDraft) => Promise<string>;
    updateItem: (id: string, draft: ItemDraft) => Promise<boolean>;
    deleteItem: (id: string) => Promise<void>;
  };
  drawer: {
    open: () => void;
    close: () => void;
  };
  draft: {
    reset: () => void;
    update: (item: Item) => void;
  };
}

export function getItemActions({ db, drawer, draft }: GetItemActionsParams) {
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
    startCreatingItem,
    startEditingItem,
    saveItem,
    deleteItem,
  };
}
