import Dexie, { type EntityTable } from "dexie";
import { BudgetEntry } from "@/core/types";

const db = new Dexie("BudgetDatabase") as Dexie & {
  incomes: EntityTable<BudgetEntry, "id">;
  expenses: EntityTable<BudgetEntry, "id">;
};

db.version(1).stores({
  incomes: "id",
  expenses: "id",
});

db.on("populate", (tx) => {
  const migrateEntries = (entriesType: string) => {
    const data = localStorage.getItem(entriesType);
    if (!data) return false;

    try {
      const entries = JSON.parse(data) as BudgetEntry[];

      if (Array.isArray(entries) && entries.length > 0) {
        tx.table(entriesType).bulkAdd(entries);
        return true;
      }
    } catch (error) {
      console.error(`Failed to migrate ${entriesType}:`, error);
    }

    return false;
  };

  const migrateAndCleanup = (entriesType: string, successMessage: string) => {
    const migrated = migrateEntries(entriesType);

    if (migrated) {
      console.log(successMessage);
      localStorage.removeItem(entriesType);
    }
  };

  ["incomes", "expenses"].forEach((entriesType) => {
    const message = `${entriesType} migrated from localStorage to IndexedDB`;
    migrateAndCleanup(entriesType, message);
  });
});

export { db };
