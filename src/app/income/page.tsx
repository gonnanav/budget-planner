"use client";

import { useSectionView } from "@/hooks/useSectionView";
import { SectionLayout } from "@/components/section-layout";
import { SectionTabs } from "@/components/section-tabs";
import { ItemListItem } from "@/components/item-list-item";
import { CategoryListItem } from "@/components/category-list-item";
import { EmptyStateText, SectionList } from "@/components/shared";
import { Heading } from "@/components/shared/Heading";
import { AddButton } from "@/components/shared/AddButton";
import { ItemDrawer } from "@/components/item-drawer";
import {
  CategoryDrawer,
  useCategoryDrawer,
} from "@/components/category-drawer";
import { useItemDrawer } from "@/components/item-drawer";
import { useIncomes } from "@/hooks/useIncomes";

export default function Page() {
  const { itemDrawerProps, onOpenItemDrawer, onCloseItemDrawer } =
    useItemDrawer();
  const { categoryDrawerProps, onOpenCategoryDrawer, onCloseCategoryDrawer } =
    useCategoryDrawer();

  const {
    incomes,
    incomeCategories,
    onClickAddIncomeItem,
    onClickIncomeItem,
    onClickAddIncomeCategory,
    onClickIncomeCategory,
  } = useIncomes({
    onOpenItemDrawer,
    onCloseItemDrawer,
    onOpenCategoryDrawer,
    onCloseCategoryDrawer,
  });

  const { view, addButtonLabel, onChangeView, onAdd } = useSectionView({
    addItemLabel: "Add Income Item",
    addCategoryLabel: "Add Income Category",
    onAddItem: onClickAddIncomeItem,
    onAddCategory: onClickAddIncomeCategory,
  });

  return (
    <>
      <SectionLayout
        heading={<Heading>Income</Heading>}
        addButton={<AddButton label={addButtonLabel} onClick={onAdd} />}
        tabs={<SectionTabs selectedTab={view} onTabChange={onChangeView} />}
        view={view}
        items={
          <SectionList
            items={incomes}
            empty={<EmptyStateText>No items yet</EmptyStateText>}
          >
            {(item) => (
              <ItemListItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                frequency={item.frequency}
                normalizedAmount={item.normalizedAmount}
                onClick={() => onClickIncomeItem(item.id)}
              />
            )}
          </SectionList>
        }
        categories={
          <SectionList
            items={incomeCategories}
            empty={<EmptyStateText>No categories yet</EmptyStateText>}
          >
            {(category) => (
              <CategoryListItem
                key={category.id}
                name={category.name}
                amount={category.amount}
                onClick={() => onClickIncomeCategory(category.id)}
              />
            )}
          </SectionList>
        }
      />
      <ItemDrawer {...itemDrawerProps} />
      <CategoryDrawer {...categoryDrawerProps} />
    </>
  );
}
