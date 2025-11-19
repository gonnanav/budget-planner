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
import { useSectionView } from "@/hooks/useSectionView";
import { useItemDrawer } from "@/components/item-drawer";
import { useCategoryDrawer } from "@/components/category-drawer";
import { useBudgetSection } from "@/hooks/useBudgetSection";

interface SectionScreenProps {
  addItemButtonLabel: string;
  addCategoryButtonLabel: string;
  selectedTab: string;
  headingText: string;
  itemsTableName: "incomes" | "expenses";
  categoriesTableName: "incomeCategories" | "expenseCategories";
  onBackup: () => Promise<void>;
  onRestore: (data: BackupData) => Promise<void>;
}

export function SectionScreen({
  addItemButtonLabel,
  addCategoryButtonLabel,
  selectedTab,
  headingText,
  itemsTableName,
  categoriesTableName,
  onBackup,
  onRestore,
}: SectionScreenProps) {
  const { itemDrawerProps, onOpenItemDrawer, onCloseItemDrawer } =
    useItemDrawer();
  const { categoryDrawerProps, onOpenCategoryDrawer, onCloseCategoryDrawer } =
    useCategoryDrawer();

  const {
    items,
    categories,
    onClickAddItem,
    onClickItem,
    onClickAddCategory,
    onClickCategory,
  } = useBudgetSection({
    itemsTableName,
    categoriesTableName,
    onOpenItemDrawer,
    onCloseItemDrawer,
    onOpenCategoryDrawer,
    onCloseCategoryDrawer,
  });

  const { view, addButtonLabel, onChangeView, onAdd } = useSectionView({
    addItemLabel: addItemButtonLabel,
    addCategoryLabel: addCategoryButtonLabel,
    onAddItem: onClickAddItem,
    onAddCategory: onClickAddCategory,
  });

  return (
    <AppLayout
      selectedTab={selectedTab}
      onBackup={onBackup}
      onRestore={onRestore}
    >
      <SectionLayout
        heading={<Heading>{headingText}</Heading>}
        addButton={<AddButton label={addButtonLabel} onClick={onAdd} />}
        tabs={<SectionTabs selectedTab={view} onTabChange={onChangeView} />}
        view={view}
        items={
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
                onClick={() => onClickItem(item.id)}
              />
            )}
          </SectionList>
        }
        categories={
          <SectionList
            items={categories}
            empty={<EmptyStateText>No categories yet</EmptyStateText>}
          >
            {(category) => (
              <CategoryListItem
                key={category.id}
                name={category.name}
                amount={category.amount}
                onClick={() => onClickCategory(category.id)}
              />
            )}
          </SectionList>
        }
      />
      <ItemDrawer {...itemDrawerProps} />
      <CategoryDrawer {...categoryDrawerProps} />
    </AppLayout>
  );
}
