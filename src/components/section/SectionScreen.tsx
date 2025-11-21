import { useState } from "react";
import { useDisclosure } from "@heroui/react";
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
    isOpen: isItemDrawerOpen,
    onOpen: onItemDrawerOpen,
    onClose: onItemDrawerClose,
  } = useDisclosure();
  const [view, setView] = useState<"items" | "categories">("items");
  const [selectedItem, setSelectedItem] = useState<BudgetItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const {
    isOpen: isCategoryDrawerOpen,
    onOpen: onCategoryDrawerOpen,
    onClose: onCategoryDrawerClose,
  } = useDisclosure();

  const handleClickAddItem = () => {
    setSelectedItem(null);
    onItemDrawerOpen();
  };

  const handleClickItem = (item: BudgetItem) => {
    setSelectedItem(item);
    onItemDrawerOpen();
  };

  const handleUpdateItem = async (input: BudgetItemInput) => {
    if (!selectedItem) return;

    await onUpdateItem(selectedItem.id, input);
    onItemDrawerClose();
  };

  const handleAddItem = async (input: BudgetItemInput) => {
    await onAddItem(input);
    onItemDrawerClose();
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;

    await onDeleteItem(selectedItem.id);
    onItemDrawerClose();
  };

  const handleClickAddCategory = () => {
    setSelectedCategory(null);
    onCategoryDrawerOpen();
  };

  const handleClickCategory = (category: Category) => {
    setSelectedCategory(category);
    onCategoryDrawerOpen();
  };

  const handleUpdateCategory = async (name: string) => {
    if (!selectedCategory) return;

    await onUpdateCategory(selectedCategory.id, name);
    onCategoryDrawerClose();
  };

  const handleAddCategory = async (name: string) => {
    await onAddCategory(name);
    onCategoryDrawerClose();
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    await onDeleteCategory(selectedCategory.id);
    onCategoryDrawerClose();
  };

  const addButtonProps =
    view === "items"
      ? { label: addItemButtonLabel, onClick: handleClickAddItem }
      : { label: addCategoryButtonLabel, onClick: handleClickAddCategory };

  const handleSaveItem = selectedItem ? handleUpdateItem : handleAddItem;
  const handleSaveCategory = selectedCategory
    ? handleUpdateCategory
    : handleAddCategory;

  return (
    <AppLayout
      selectedTab={selectedTab}
      onBackup={onBackup}
      onRestore={onRestore}
    >
      <SectionLayout
        heading={<Heading>{headingText}</Heading>}
        addButton={<AddButton {...addButtonProps} />}
        tabs={<SectionTabs selectedTab={view} onTabChange={setView} />}
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
                onClick={() => handleClickItem(item)}
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
                onClick={() => handleClickCategory(category)}
              />
            )}
          </SectionList>
        )}
      </SectionLayout>
      <ItemDrawer
        isOpen={isItemDrawerOpen}
        item={selectedItem}
        categories={categories}
        onCancel={onItemDrawerClose}
        onSave={handleSaveItem}
        onClose={onItemDrawerClose}
        onDelete={handleDeleteItem}
      />
      <CategoryDrawer
        isOpen={isCategoryDrawerOpen}
        category={selectedCategory}
        onCancel={onCategoryDrawerClose}
        onSave={handleSaveCategory}
        onClose={onCategoryDrawerClose}
        onDelete={handleDeleteCategory}
      />
    </AppLayout>
  );
}
