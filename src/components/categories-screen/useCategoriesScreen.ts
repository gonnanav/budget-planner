import { useLiveQuery } from "dexie-react-hooks";
import { CategoryDraft } from "@/components/shared/types";
import { Category, Item } from "@/core/types";
import { enrichCategory } from "@/core/categories";
import { useCategoryDrawer } from "./useCategoryDrawer";
import { useChangeSectionView } from "@/hooks/useChangeSectionView";
import { useCategoriesData } from "./useCategoriesData";

export type CategoriesView = "items" | "categories";

interface UseCategoriesScreenParams {
  basePath: "/income" | "/expenses";
  drawerHeadingTexts: { create: string; edit: string };
  db: {
    getItems: () => Promise<Item[]>;
    getCategories: () => Promise<Category[]>;
    addCategory: (name: string) => Promise<string>;
    updateCategory: (id: string, name: string) => Promise<boolean>;
    deleteCategory: (id: string) => Promise<void>;
  };
}

export function useCategoriesScreen({
  basePath,
  drawerHeadingTexts,
  db,
}: UseCategoriesScreenParams) {
  const { changeView } = useChangeSectionView(basePath);
  const { items, categories } = useCategoriesData({
    getItems: db.getItems,
    getCategories: db.getCategories,
  });
  const { drawer, draft } = useCategoryDrawer(drawerHeadingTexts);

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
    categories,
    draft: draft.value,
    isDrawerOpen: drawer.isOpen,
    drawerHeadingText: drawer.headingText,
    startCreatingCategory,
    startEditingCategory,
    saveCategory,
    deleteCategory,
    changeView,
    updateDraft: draft.update,
    closeDrawer: drawer.close,
  };
}
