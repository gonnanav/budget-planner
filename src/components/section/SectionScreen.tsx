import { BudgetItem, BudgetItemInput, Category } from "@/core/types";
import { SectionLayout } from "./SectionLayout";
import { SectionTabs } from "./SectionTabs";
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
  selectedTab: string;
  headingText: string;
  labels: {
    addItem: string;
    addCategory: string;
  };
  data: {
    items: (BudgetItem & { normalizedAmount: number })[];
    categories: (Category & { amount: number })[];
  };
  backup: {
    backup: () => Promise<void>;
    restore: (data: BackupData) => Promise<void>;
  };
  itemActions: {
    add: (input: BudgetItemInput) => Promise<string>;
    update: (id: string, input: BudgetItemInput) => Promise<boolean>;
    delete: (id: string) => Promise<void>;
  };
  categoryActions: {
    add: (name: string) => Promise<string>;
    update: (id: string, name: string) => Promise<boolean>;
    delete: (id: string) => Promise<void>;
  };
}

export function SectionScreen({
  selectedTab,
  headingText,
  labels,
  data,
  backup,
  itemActions,
  categoryActions,
}: SectionScreenProps) {
  const { addItem: addItemButtonLabel, addCategory: addCategoryButtonLabel } =
    labels;
  const { items, categories } = data;
  const { backup: onBackup, restore: onRestore } = backup;

  const {
    isItemDrawerOpen,
    selectedItem,
    handleAddItemClick,
    handleItemClick,
    handleSaveItemClick,
    handleDeleteItemClick,
    handleCloseItemDrawer,
  } = useSectionItems({
    onAddItem: itemActions.add,
    onUpdateItem: itemActions.update,
    onDeleteItem: itemActions.delete,
  });

  const {
    isCategoryDrawerOpen,
    selectedCategory,
    handleAddCategoryClick,
    handleCategoryClick,
    handleSaveCategoryClick,
    handleDeleteCategoryClick,
    handleCloseCategoryDrawer,
  } = useSectionCategories({
    onAddCategory: categoryActions.add,
    onUpdateCategory: categoryActions.update,
    onDeleteCategory: categoryActions.delete,
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
        onSave={handleSaveItemClick}
        onClose={handleCloseItemDrawer}
        onDelete={handleDeleteItemClick}
      />
      <CategoryDrawer
        isOpen={isCategoryDrawerOpen}
        category={selectedCategory}
        onCancel={handleCloseCategoryDrawer}
        onSave={handleSaveCategoryClick}
        onClose={handleCloseCategoryDrawer}
        onDelete={handleDeleteCategoryClick}
      />
    </AppLayout>
  );
}
