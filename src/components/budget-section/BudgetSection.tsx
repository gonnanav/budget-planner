import { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { BudgetEntry, Category } from "@/core/types";
import { ItemsContent } from "./ItemsContent";
import { CategoriesContent } from "./CategoriesContent";
import { AddButton } from "./AddButton";

interface BudgetSectionProps {
  title: string;
  items: BudgetEntry[];
  categories: Category[];
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
        <AddButton onAdd={handleAdd} ariaLabel={addButtonLabel} />
      </div>

      <Tabs
        size="sm"
        radius="full"
        selectedKey={view}
        onSelectionChange={setView}
      >
        <Tab key="items" title="Items">
          <ItemsContent items={items} onEditItem={onEditItem} />
        </Tab>
        <Tab key="categories" title="Categories">
          <CategoriesContent
            categories={categories}
            items={items}
            onEditCategory={onEditCategory}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
