import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ServicesContext } from "contexts/ServicesContext";
import { getItems, getCategories } from "db/budget";
import { addItem, updateItem, deleteItem, addCategory, updateCategory, deleteCategory } from "services/budget";
import { backupData, restoreData } from "services/backup";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <MantineProvider>
      <Notifications />
      <ServicesContext
        value={{
          budgetService: {
            getItems, addItem, updateItem, deleteItem,
            getCategories, addCategory, updateCategory, deleteCategory,
          },
          backupService: { backupData, restoreData },
        }}
      >
        {children}
      </ServicesContext>
    </MantineProvider>
  );
}
