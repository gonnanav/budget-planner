import { db } from "../db";
import { createCategoryApi } from "../shared/categories";

export const {
  getCategories: getIncomeCategories,
  addCategory: addIncomeCategory,
  updateCategory: updateIncomeCategory,
  deleteCategory: deleteIncomeCategory,
} = createCategoryApi(db.incomeCategories, db.incomeItems);
