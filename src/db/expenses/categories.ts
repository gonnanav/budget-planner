import { db } from "../db";
import { createCategoryApi } from "../shared/categories";

export const {
  useCategories: useExpenseCategories,
  addCategory: addExpenseCategory,
  updateCategory: updateExpenseCategory,
  deleteCategory: deleteExpenseCategory,
} = createCategoryApi(db.expenseCategories, db.expenseItems);
