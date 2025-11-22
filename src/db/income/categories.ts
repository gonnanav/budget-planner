import { db } from "../db";
import { createCategoryApi } from "../shared/categories";

export const {
  useCategories: useIncomeCategories,
  addCategory: addIncomeCategory,
  updateCategory: updateIncomeCategory,
  deleteCategory: deleteIncomeCategory,
} = createCategoryApi(db.incomeCategories, db.incomeItems);
