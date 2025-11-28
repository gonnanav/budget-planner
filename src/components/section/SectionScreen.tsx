import { Item, ItemInput, Category } from "@/core/types";
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
import { useItemInputs } from "@/components/section/useItemInputs";

interface SectionScreenProps {
  selectedTab: string;
  headingText: string;
  labels: {
    addItem: string;
    addCategory: string;
  };
  data: {
    items: (Item & { normalizedAmount: number })[];
    categories: (Category & { amount: number })[];
  };
  backupActions: {
    backup: () => Promise<void>;
    restore: (data: BackupData) => Promise<void>;
  };
  itemActions: {
    add: (input: ItemInput) => Promise<string>;
    update: (id: string, input: ItemInput) => Promise<boolean>;
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
  backupActions,
  itemActions,
  categoryActions,
}: SectionScreenProps) {
  const { items, categories } = data;
  const { backup, restore } = backupActions;

  const {
    name,
    amount,
    frequency,
    categoryId,
    notes,
    onNameChange,
    onAmountChange,
    onFrequencyChange,
    onCategoryIdChange,
    onNotesChange,
    onReset,
    onCopy,
  } = useItemInputs();

  const {
    isItemDrawerOpen,
    drawerHeading,
    handleAddItemClick,
    handleItemClick,
    handleSaveItemClick,
    handleDeleteItemClick,
    handleCloseItemDrawer,
  } = useSectionItems({
    onAddItem: itemActions.add,
    onUpdateItem: itemActions.update,
    onDeleteItem: itemActions.delete,
    onChangeItemInput: onCopy,
    onResetItemInput: onReset,
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
      addItemButtonLabel: labels.addItem,
      addCategoryButtonLabel: labels.addCategory,
      onAddItemClick: handleAddItemClick,
      onAddCategoryClick: handleAddCategoryClick,
    });

  return (
    <AppLayout selectedTab={selectedTab} onBackup={backup} onRestore={restore}>
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
        heading={drawerHeading}
        categories={categories}
        name={name}
        amount={amount}
        frequency={frequency}
        categoryId={categoryId}
        notes={notes}
        onNameChange={onNameChange}
        onAmountChange={onAmountChange}
        onFrequencyChange={onFrequencyChange}
        onCategoryIdChange={onCategoryIdChange}
        onNotesChange={onNotesChange}
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
