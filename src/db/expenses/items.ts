import { db } from "../db";
import { createItemApi } from "../shared/items";

export const {
  useItems: useExpenseItems,
  addItem: addExpenseItem,
  updateItem: updateExpenseItem,
  deleteItem: deleteExpenseItem,
} = createItemApi(db.expenseItems);
