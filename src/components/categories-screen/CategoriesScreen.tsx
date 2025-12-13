import { SectionShell } from "@/components/section/SectionShell";
import { CategoryRow } from "@/components/category-row";
import { CategoryDrawer } from "@/components/category-drawer";
import { Category } from "@/core/types";
import { CategoryDraft } from "@/components/shared/types";

interface CategoriesScreenProps {
  headingText: string;
  addButtonLabel: string;
  emptyItemsText: string;
  categories: (Category & { amount: number })[];
  isDrawerOpen: boolean;
  drawerHeadingText: string;
  draft: CategoryDraft;
  onAddClick: () => void;
  onCategoryClick: (category: Category) => void;
  onDraftChange: (draft: Partial<CategoryDraft>) => void;
  onDrawerClose: () => void;
  onSaveClick: (draft: CategoryDraft) => Promise<void>;
  onDeleteClick: (id?: string) => Promise<void>;
  onViewChange: (view: "items" | "categories") => void;
}

export function CategoriesScreen({
  headingText,
  addButtonLabel,
  emptyItemsText,
  categories,
  draft,
  isDrawerOpen,
  drawerHeadingText,
  onDraftChange,
  onDrawerClose,
  onAddClick,
  onCategoryClick,
  onSaveClick,
  onDeleteClick,
  onViewChange,
}: CategoriesScreenProps) {
  return (
    <>
      <SectionShell
        headingText={headingText}
        addButtonLabel={addButtonLabel}
        selectedTab="categories"
        items={categories}
        emptyItemsText={emptyItemsText}
        onAddClick={onAddClick}
        onTabChange={onViewChange}
      >
        {(category) => (
          <CategoryRow
            key={category.id}
            name={category.name}
            amount={category.amount}
            onClick={() => onCategoryClick(category)}
          />
        )}
      </SectionShell>
      <CategoryDrawer
        isOpen={isDrawerOpen}
        headingText={drawerHeadingText}
        draft={draft}
        onDraftChange={onDraftChange}
        onCancel={onDrawerClose}
        onSave={onSaveClick}
        onClose={onDrawerClose}
        onDelete={onDeleteClick}
      />
    </>
  );
}
