import { db } from "../db";
import { createItemApi } from "../shared/items";

export const {
  getItems: getIncomeItems,
  addItem: addIncomeItem,
  updateItem: updateIncomeItem,
  deleteItem: deleteIncomeItem,
} = createItemApi(db.incomeItems, "income");
