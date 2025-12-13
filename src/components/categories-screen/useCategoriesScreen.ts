import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { useDisclosure } from "@heroui/react";
import { useDraft } from "@/components/shared";
import { CategoryDraft } from "@/components/shared/types";
import { Category, Item } from "@/core/types";
import { enrichCategory } from "@/core/categories";

const DEFAULT_CATEGORY_DRAFT: CategoryDraft = { name: "" };

export type CategoriesView = "items" | "categories";

interface UseCategoriesScreenParams {
  basePath: "/income" | "/expenses";
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
  db,
}: UseCategoriesScreenParams) {
  const router = useRouter();
  const items = useLiveQuery(db.getItems) ?? [];
  const categories = useLiveQuery(db.getCategories) ?? [];
  const enrichedCategories = categories.map((category) =>
    enrichCategory(category, items),
  );

  const { draft, updateDraft, resetDraft } = useDraft<CategoryDraft>(
    DEFAULT_CATEGORY_DRAFT,
  );

  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const startCreatingCategory = () => {
    resetDraft();
    openDrawer();
  };

  const startEditingCategory = (category: Category) => {
    updateDraft(category);
    openDrawer();
  };

  const saveCategory = async ({ id, name }: CategoryDraft) => {
    if (id) {
      await db.updateCategory(id, name);
    } else {
      await db.addCategory(name ?? "");
    }

    closeDrawer();
  };

  const deleteCategory = async (id?: string) => {
    if (!id) return;

    await db.deleteCategory(id);
    closeDrawer();
  };

  const changeView = (view: CategoriesView) => {
    router.push(`${basePath}/${view}`);
  };

  const drawerHeadingText = draft.id ? "Edit Category" : "Add Category";

  return {
    categories: enrichedCategories,
    draft,
    isDrawerOpen,
    drawerHeadingText,
    startCreatingCategory,
    startEditingCategory,
    saveCategory,
    deleteCategory,
    changeView,
    updateDraft,
    closeDrawer,
  };
}
