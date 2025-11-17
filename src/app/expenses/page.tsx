"use client";

import { useContext } from "react";
import { ExpenseContext } from "@/contexts/ExpenseContext";
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
    onClickAddExpenseItem,
    onClickExpenseItem,
    onClickAddExpenseCategory,
    onClickExpenseCategory,
  } = useContext(ExpenseContext);

  const { view, addButtonLabel, onChangeView, onAdd } = useSectionView({
    addItemLabel: "Add Expense Item",
    addCategoryLabel: "Add Expense Category",
    onAddItem: onClickAddExpenseItem,
    onAddCategory: onClickAddExpenseCategory,
  });

  return (
    <SectionLayout
      heading={<Heading>Expenses</Heading>}
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
              onClick={() => onClickExpenseItem(item.id)}
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
              onClick={() => onClickExpenseCategory(category.id)}
            />
          )}
        </SectionList>
      }
    />
  );
}
