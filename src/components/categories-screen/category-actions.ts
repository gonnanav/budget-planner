import { CategoryDraft } from "@/components/shared/types";
import { Category } from "@/core/types";

interface GetCategoryActionsParams {
  db: {
    addCategory: (name: string) => Promise<string>;
    updateCategory: (id: string, name: string) => Promise<boolean>;
    deleteCategory: (id: string) => Promise<void>;
  };
  drawer: {
    open: () => void;
    close: () => void;
  };
  draft: {
    value: CategoryDraft;
    update: (category: Category) => void;
    reset: () => void;
  };
}

export function getCategoryActions({
  db,
  drawer,
  draft,
}: GetCategoryActionsParams) {
  const startCreatingCategory = () => {
    draft.reset();
    drawer.open();
  };

  const startEditingCategory = (category: Category) => {
    draft.update(category);
    drawer.open();
  };

  const saveCategory = async ({ id, name }: CategoryDraft) => {
    if (id) {
      await db.updateCategory(id, name);
    } else {
      await db.addCategory(name ?? "");
    }

    drawer.close();
  };

  const deleteCategory = async (id?: string) => {
    if (!id) return;

    await db.deleteCategory(id);
    drawer.close();
  };

  return {
    startCreatingCategory,
    startEditingCategory,
    saveCategory,
    deleteCategory,
  };
}
