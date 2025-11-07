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
  await db.transaction(
    "rw",
    db.incomeCategories,
    db.expenseCategories,
    db.incomes,
    db.expenses,
    async () => {
      await db.incomes.clear();
      await db.expenses.clear();
      await db.incomeCategories.clear();
      await db.expenseCategories.clear();

      await db.incomeCategories.bulkAdd(incomeCategories);
      await db.expenseCategories.bulkAdd(expenseCategories);
      await db.incomes.bulkAdd(incomes);
      await db.expenses.bulkAdd(expenses);
    },
  );
}
