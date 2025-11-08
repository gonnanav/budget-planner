import { db } from "./db";
import { Category, BudgetItem } from "@/core/types";

interface ReplaceAllProps {
  incomeCategories: Category[];
  expenseCategories: Category[];
  incomes: BudgetItem[];
  expenses: BudgetItem[];
}

export async function replaceAll({
  incomeCategories,
  expenseCategories,
  incomes,
  expenses,
}: ReplaceAllProps): Promise<void> {
  await db.transaction("rw", db.tables, async () =>
    Promise.all([
      replaceAllInTable("incomeCategories", incomeCategories),
      replaceAllInTable("expenseCategories", expenseCategories),
      replaceAllInTable("incomes", incomes),
      replaceAllInTable("expenses", expenses),
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
