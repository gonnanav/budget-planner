import { Category } from "@/core/types";
import { SectionShell } from "./SectionShell";
import { CategoryRow } from "@/components/category-row";
import { useCategoryDraft } from "./useCategoryDraft";
import { useSectionCategories } from "./useSectionCategories";
import { CategoryDrawer } from "@/components/category-drawer";

interface CategoriesSectionProps {
  headingText: string;
  categories: (Category & { amount: number })[];
  addCategory: (name: string) => Promise<string>;
  updateCategory: (id: string, name: string) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<void>;
  onViewChange: (view: "items" | "categories") => void;
}

export function CategoriesSection({
  headingText,
  categories,
  addCategory,
  updateCategory,
  deleteCategory,
  onViewChange,
}: CategoriesSectionProps) {
  const { categoryDraft, updateCategoryDraft, resetCategoryDraft } =
    useCategoryDraft();

  const {
    isCategoryDrawerOpen,
    categoryDrawerHeading,
    handleAddCategoryClick,
    handleCategoryClick,
    handleSaveCategoryClick,
    handleDeleteCategoryClick,
    handleCloseCategoryDrawer,
  } = useSectionCategories({
    onAddCategory: addCategory,
    onUpdateCategory: updateCategory,
    onDeleteCategory: deleteCategory,
    onChangeCategoryInput: updateCategoryDraft,
    onResetCategoryInput: resetCategoryDraft,
  });

  return (
    <>
      <SectionShell
        headingText={headingText}
        addButtonLabel="Add category"
        selectedTab="categories"
        items={categories}
        emptyText="No categories yet"
        onAddButtonClick={handleAddCategoryClick}
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
        draft={categoryDraft}
        onDraftChange={updateCategoryDraft}
        onCancel={handleCloseCategoryDrawer}
        onSave={handleSaveCategoryClick}
        onClose={handleCloseCategoryDrawer}
        onDelete={handleDeleteCategoryClick}
      />
    </>
  );
}
