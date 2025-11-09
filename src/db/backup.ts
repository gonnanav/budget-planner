import { db } from "./db";
import { Category, BudgetItem } from "@/core/types";

interface ReplaceAllProps {
  incomeItems: BudgetItem[];
  incomeCategories: Category[];
  expenseItems: BudgetItem[];
  expenseCategories: Category[];
}

export async function replaceAll({
  incomeItems,
  incomeCategories,
  expenseItems,
  expenseCategories,
}: ReplaceAllProps): Promise<void> {
  await db.transaction("rw", db.tables, async () =>
    Promise.all([
      replaceAllInTable("incomes", incomeItems),
      replaceAllInTable("incomeCategories", incomeCategories),
      replaceAllInTable("expenses", expenseItems),
      replaceAllInTable("expenseCategories", expenseCategories),
    ]),
  );
}

async function replaceAllInTable(
  table: string,
  data: unknown[],
): Promise<void> {
  await db.table(table).clear();
  await db.table(table).bulkAdd(data);
}

export async function getAllData(): Promise<{
  incomeItems: BudgetItem[];
  incomeCategories: Category[];
  expenseItems: BudgetItem[];
  expenseCategories: Category[];
}> {
  const [incomeItems, incomeCategories, expenseItems, expenseCategories] =
    await Promise.all([
      db.table("incomes").toArray(),
      db.table("incomeCategories").toArray(),
      db.table("expenses").toArray(),
      db.table("expenseCategories").toArray(),
    ]);

  return {
    incomeItems,
    incomeCategories,
    expenseItems,
    expenseCategories,
  };
}
