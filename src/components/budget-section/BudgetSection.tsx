import { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { ItemsContent } from "@/components/item-list";
import { CategoriesContent } from "@/components/category-list";
import { AddButton } from "@/components/shared";

interface BudgetSectionProps {
  title: string;
  items: {
    id: string;
    name: string;
    amount: number | null;
    frequency: string;
    normalizedAmount: number;
  }[];
  categories: {
    id: string;
    name: string;
    amount: number;
  }[];
  onClickAddItem: () => void;
  onClickItem: (id: string) => void;
  onClickAddCategory: () => void;
  onClickCategory: (id: string) => void;
}

export function BudgetSection({
  title,
  items,
  categories,
  onClickAddItem,
  onClickItem,
  onClickAddCategory,
  onClickCategory,
}: BudgetSectionProps) {
  const [view, setView] = useState<string | number>("items");

  const addButtonLabel = view === "items" ? "Add item" : "Add category";

  const handleAdd = () => {
    if (view === "items") {
      onClickAddItem();
    } else if (view === "categories") {
      onClickAddCategory();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <AddButton label={addButtonLabel} onClick={handleAdd} />
      </div>

      <Tabs
        size="sm"
        radius="full"
        selectedKey={view}
        onSelectionChange={setView}
      >
        <Tab key="items" title="Items">
          <ItemsContent items={items} onClickItem={onClickItem} />
        </Tab>
        <Tab key="categories" title="Categories">
          <CategoriesContent
            categories={categories}
            onClickCategory={onClickCategory}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
