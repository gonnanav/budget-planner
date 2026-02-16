import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ServicesContext } from "contexts/ServicesContext";
import { getItems } from "db/items";
import { getCategories } from "db/categories";
import { addItem, updateItem, deleteItem } from "services/items";
import { addCategory, updateCategory, deleteCategory } from "services/categories";
import { backupData, restoreData } from "services/data";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <MantineProvider>
      <Notifications />
      <ServicesContext
        value={{
          itemService: { getItems, addItem, updateItem, deleteItem },
          categoryService: { getCategories, addCategory, updateCategory, deleteCategory },
          dataService: { backupData, restoreData },
        }}
      >
        {children}
      </ServicesContext>
    </MantineProvider>
  );
}
