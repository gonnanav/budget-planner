import { db } from "../db";
import { createItemApi } from "../shared/items";

export const {
  getItems: getExpenseItems,
  addItem: addExpenseItem,
  updateItem: updateExpenseItem,
  deleteItem: deleteExpenseItem,
} = createItemApi(db.expenseItems, "expenses");
