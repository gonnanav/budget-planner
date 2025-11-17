"use client";

import { useContext } from "react";
import { IncomeContext } from "@/contexts/IncomeContext";
import { useSectionView } from "@/hooks/useSectionView";
import { SectionLayout } from "@/components/section-layout";
import { SectionTabs } from "@/components/section-tabs";
import { ItemListItem } from "@/components/item-list-item";
import { CategoryListItem } from "@/components/category-list-item";
import { EmptyStateText, SectionList } from "@/components/shared";
import { Heading } from "@/components/shared/Heading";
import { AddButton } from "@/components/shared/AddButton";

export default function Page() {
  const {
    items,
    categories,
    onClickAddIncomeItem,
    onClickIncomeItem,
    onClickAddIncomeCategory,
    onClickIncomeCategory,
  } = useContext(IncomeContext);

  const { view, addButtonLabel, onChangeView, onAdd } = useSectionView({
    addItemLabel: "Add Income Item",
    addCategoryLabel: "Add Income Category",
    onAddItem: onClickAddIncomeItem,
    onAddCategory: onClickAddIncomeCategory,
  });

  return (
    <SectionLayout
      heading={<Heading>Income</Heading>}
      addButton={<AddButton label={addButtonLabel} onClick={onAdd} />}
    >
      <SectionTabs selectedTab={view} onTabChange={onChangeView} />
      {view === "items" && (
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
              onClick={() => onClickIncomeItem(item.id)}
            />
          )}
        </SectionList>
      )}
      {view === "categories" && (
        <SectionList
          items={categories}
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
      )}
    </SectionLayout>
  );
}
