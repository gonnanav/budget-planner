import { Category, Item } from "@/core/types";
import { useCategoryDrawer } from "./useCategoryDrawer";
import { useChangeSectionView } from "@/hooks/useChangeSectionView";
import { useCategoriesData } from "./useCategoriesData";
import { getCategoryActions } from "./category-actions";

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
  const actions = getCategoryActions({ db, drawer, draft });

  return { categories, drawer, draft, actions, changeView };
}
