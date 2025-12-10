import { Category } from "@/core/types";
import { SectionShell } from "@/components/section/SectionShell";
import { CategoryRow } from "@/components/category-row";
import { useCategoryDraft } from "./useCategoryDraft";
import { useSectionCategories } from "./useSectionCategories";
import { CategoryDrawer } from "@/components/category-drawer";

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
    isCategoryDrawerOpen,
    handleAddCategoryClick,
    handleCategoryClick,
    handleSaveCategoryClick,
    handleDeleteCategoryClick,
    handleCloseCategoryDrawer,
  } = useSectionCategories({
    onAddCategory: addCategory,
    onUpdateCategory: updateCategory,
    onDeleteCategory: deleteCategory,
    onChangeCategoryInput: updateDraft,
    onResetCategoryInput: resetDraft,
  });

  const categoryDrawerHeading = draft.id ? "Edit Category" : "Add Category";

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
        isOpen={isCategoryDrawerOpen}
        heading={categoryDrawerHeading}
        draft={draft}
        onDraftChange={updateDraft}
        onCancel={handleCloseCategoryDrawer}
        onSave={handleSaveCategoryClick}
        onClose={handleCloseCategoryDrawer}
        onDelete={handleDeleteCategoryClick}
      />
    </>
  );
}
