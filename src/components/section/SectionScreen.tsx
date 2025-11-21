import { BudgetItem, BudgetItemInput, Category } from "@/core/types";
import { SectionLayout } from "@/components/section-layout";
import { SectionTabs } from "@/components/section-tabs";
import { ItemListItem } from "@/components/item-list-item";
import { CategoryListItem } from "@/components/category-list-item";
import { EmptyStateText, SectionList } from "@/components/shared";
import { Heading } from "@/components/shared/Heading";
import { AddButton } from "@/components/shared/AddButton";
import { ItemDrawer } from "@/components/item-drawer";
import { CategoryDrawer } from "@/components/category-drawer";
import { AppLayout } from "@/components/app-layout";
import { BackupData } from "@/lib/backup-restore";
import { useSectionCategories } from "@/components/section/useSectionCategories";
import { useSectionItems } from "@/components/section/useSectionItems";
import { useSectionView } from "@/components/section/useSectionView";

interface SectionScreenProps {
  addItemButtonLabel: string;
  addCategoryButtonLabel: string;
  selectedTab: string;
  headingText: string;
  items: (BudgetItem & { normalizedAmount: number })[];
  categories: (Category & { amount: number })[];
  onBackup: () => Promise<void>;
  onRestore: (data: BackupData) => Promise<void>;
  onAddItem: (input: BudgetItemInput) => Promise<string>;
  onUpdateItem: (id: string, input: BudgetItemInput) => Promise<boolean>;
  onDeleteItem: (id: string) => Promise<void>;
  onAddCategory: (name: string) => Promise<string>;
  onUpdateCategory: (id: string, name: string) => Promise<boolean>;
  onDeleteCategory: (id: string) => Promise<void>;
}

export function SectionScreen({
  addItemButtonLabel,
  addCategoryButtonLabel,
  selectedTab,
  headingText,
  items,
  categories,
  onBackup,
  onRestore,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: SectionScreenProps) {
  const {
    isItemDrawerOpen,
    selectedItem,
    handleAddItemClick,
    handleItemClick,
    handleSaveItem,
    handleDeleteItem,
    handleCloseItemDrawer,
  } = useSectionItems({
    onAddItem,
    onUpdateItem,
    onDeleteItem,
  });

  const {
    isCategoryDrawerOpen,
    selectedCategory,
    handleAddCategoryClick,
    handleCategoryClick,
    handleSaveCategory,
    handleDeleteCategory,
    handleCloseCategoryDrawer,
  } = useSectionCategories({
    onAddCategory,
    onUpdateCategory,
    onDeleteCategory,
  });

  const { view, handleViewChange, addButtonLabel, handleAddButtonClick } =
    useSectionView({
      addItemButtonLabel,
      addCategoryButtonLabel,
      onAddItemClick: handleAddItemClick,
      onAddCategoryClick: handleAddCategoryClick,
    });

  return (
    <AppLayout
      selectedTab={selectedTab}
      onBackup={onBackup}
      onRestore={onRestore}
    >
      <SectionLayout
        heading={<Heading>{headingText}</Heading>}
        addButton={
          <AddButton label={addButtonLabel} onClick={handleAddButtonClick} />
        }
        tabs={<SectionTabs selectedTab={view} onTabChange={handleViewChange} />}
      >
        {view === "items" ? (
          <SectionList
            items={items}
            empty={<EmptyStateText>No items yet</EmptyStateText>}
          >
            {(item) => (
              <ItemListItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                frequency={item.frequency}
                normalizedAmount={item.normalizedAmount}
                onClick={() => handleItemClick(item)}
              />
            )}
          </SectionList>
        ) : (
          <SectionList
            items={categories}
            empty={<EmptyStateText>No categories yet</EmptyStateText>}
          >
            {(category) => (
              <CategoryListItem
                key={category.id}
                name={category.name}
                amount={category.amount}
                onClick={() => handleCategoryClick(category)}
              />
            )}
          </SectionList>
        )}
      </SectionLayout>
      <ItemDrawer
        isOpen={isItemDrawerOpen}
        item={selectedItem}
        categories={categories}
        onCancel={handleCloseItemDrawer}
        onSave={handleSaveItem}
        onClose={handleCloseItemDrawer}
        onDelete={handleDeleteItem}
      />
      <CategoryDrawer
        isOpen={isCategoryDrawerOpen}
        category={selectedCategory}
        onCancel={handleCloseCategoryDrawer}
        onSave={handleSaveCategory}
        onClose={handleCloseCategoryDrawer}
        onDelete={handleDeleteCategory}
      />
    </AppLayout>
  );
}
