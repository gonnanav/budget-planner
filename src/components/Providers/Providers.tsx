"use client";

import { ToastProvider } from "@heroui/toast";
import { ItemServiceContext } from "contexts/ItemServiceContext";
import { CategoryServiceContext } from "contexts/CategoryServiceContext";
import { getItems } from "db/items";
import { getCategories } from "db/categories";
import { addItem, updateItem, deleteItem } from "services/items";
import { addCategory, updateCategory, deleteCategory } from "services/categories";
import { AppHeroUIProvider } from "./AppHeroUIProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <AppHeroUIProvider>
      <ItemServiceContext value={{ getItems, addItem, updateItem, deleteItem }}>
        <CategoryServiceContext value={{ getCategories, addCategory, updateCategory, deleteCategory }}>
          {children}
          <ToastProvider />
        </CategoryServiceContext>
      </ItemServiceContext>
    </AppHeroUIProvider>
  );
}
