import Dexie, { type EntityTable } from "dexie";
import { BudgetItem, Category } from "@/core/types";

const db = new Dexie("BudgetDatabase") as Dexie & {
  incomes: EntityTable<BudgetItem, "id">;
  expenses: EntityTable<BudgetItem, "id">;
  incomeCategories: EntityTable<Category, "id">;
  expenseCategories: EntityTable<Category, "id">;
};

db.version(4).stores({
  incomes: "id, categoryId",
  expenses: "id, categoryId",
  incomeCategories: "id",
  expenseCategories: "id",
});

db.on("populate", (tx) => {
  const migrateItems = (itemsType: string) => {
    const data = localStorage.getItem(itemsType);
    if (!data) return false;

    try {
      const items = JSON.parse(data) as BudgetItem[];

      if (Array.isArray(items) && items.length > 0) {
        tx.table(itemsType).bulkAdd(items);
        return true;
      }
    } catch (error) {
      console.error(`Failed to migrate ${itemsType}:`, error);
    }

    return false;
  };

  const migrateAndCleanup = (itemType: string, successMessage: string) => {
    const migrated = migrateItems(itemType);

    if (migrated) {
      console.log(successMessage);
      localStorage.removeItem(itemType);
    }
  };

  ["incomes", "expenses"].forEach((itemType) => {
    const message = `${itemType} migrated from localStorage to IndexedDB`;
    migrateAndCleanup(itemType, message);
  });
});

export { db };
