"use client";

import { ToastProvider } from "@heroui/toast";
import { ItemServiceContext } from "contexts/ItemServiceContext";
import { CategoryServiceContext } from "contexts/CategoryServiceContext";
import { DataServiceContext } from "contexts/DataServiceContext";
import { getItems } from "db/items";
import { getCategories } from "db/categories";
import { addItem, updateItem, deleteItem } from "services/items";
import { addCategory, updateCategory, deleteCategory } from "services/categories";
import { backupData, restoreData } from "services/data";
import { AppHeroUIProvider } from "./AppHeroUIProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <AppHeroUIProvider>
      <ItemServiceContext value={{ getItems, addItem, updateItem, deleteItem }}>
        <CategoryServiceContext value={{ getCategories, addCategory, updateCategory, deleteCategory }}>
          <DataServiceContext value={{ backupData, restoreData }}>
            {children}
            <ToastProvider />
          </DataServiceContext>
        </CategoryServiceContext>
      </ItemServiceContext>
    </AppHeroUIProvider>
  );
}
