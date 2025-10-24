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
  onAddItem: () => void;
  onEditItem: (id: string) => void;
  onAddCategory: () => void;
  onEditCategory: (id: string) => void;
}

export function BudgetSection({
  title,
  items,
  categories,
  onAddItem,
  onEditItem,
  onAddCategory,
  onEditCategory,
}: BudgetSectionProps) {
  const [view, setView] = useState<string | number>("items");

  const addButtonLabel = view === "items" ? "Add item" : "Add category";

  const handleAdd = () => {
    if (view === "items") {
      onAddItem();
    } else if (view === "categories") {
      onAddCategory();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <AddButton label={addButtonLabel} onAdd={handleAdd} />
      </div>

      <Tabs
        size="sm"
        radius="full"
        selectedKey={view}
        onSelectionChange={setView}
      >
        <Tab key="items" title="Items">
          <ItemsContent items={items} onClickItem={onEditItem} />
        </Tab>
        <Tab key="categories" title="Categories">
          <CategoriesContent
            categories={categories}
            onClickCategory={onEditCategory}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
