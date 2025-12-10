import { Category } from "@/core/types";
import { SectionShell } from "@/components/section/SectionShell";
import { CategoryRow } from "@/components/category-row";
import { useCategoryDraft } from "./useCategoryDraft";
import { CategoryDrawer } from "@/components/category-drawer";
import { useDisclosure } from "@heroui/react";
import { CategoryDraft } from "@/components/shared/types";

interface CategoriesScreenProps {
  headingText: string;
  categories: (Category & { amount: number })[];
  addCategory: (name: string) => Promise<string>;
  updateCategory: (id: string, name: string) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<void>;
  onViewChange: (view: "items" | "categories") => void;
}

export function CategoriesScreen({
  headingText,
  categories,
  addCategory,
  updateCategory,
  deleteCategory,
  onViewChange,
}: CategoriesScreenProps) {
  const { draft, updateDraft, resetDraft } = useCategoryDraft();
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const handleAddCategoryClick = () => {
    resetDraft();
    openDrawer();
  };

  const handleCategoryClick = (category: Category) => {
    updateDraft(category);
    openDrawer();
  };

  const handleSaveCategoryClick = async ({ id, name }: CategoryDraft) => {
    if (id) {
      await updateCategory(id, name);
    } else {
      await addCategory(name);
    }
    closeDrawer();
  };

  const handleDeleteCategoryClick = async (id?: string) => {
    if (!id) return;

    await deleteCategory(id);
    closeDrawer();
  };

  const drawerHeadingText = draft.id ? "Edit Category" : "Add Category";

  return (
    <>
      <SectionShell
        headingText={headingText}
        addButtonLabel="Add category"
        selectedTab="categories"
        items={categories}
        emptyItemsText="No categories yet"
        onAddClick={handleAddCategoryClick}
        onTabChange={onViewChange}
      >
        {(category) => (
          <CategoryRow
            key={category.id}
            name={category.name}
            amount={category.amount}
            onClick={() => handleCategoryClick(category)}
          />
        )}
      </SectionShell>
      <CategoryDrawer
        isOpen={isDrawerOpen}
        headingText={drawerHeadingText}
        draft={draft}
        onDraftChange={updateDraft}
        onCancel={closeDrawer}
        onSave={handleSaveCategoryClick}
        onClose={closeDrawer}
        onDelete={handleDeleteCategoryClick}
      />
    </>
  );
}
