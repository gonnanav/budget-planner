import { db } from "../db";
import { createItemApi } from "../shared/items";

export const {
  useItems: useIncomeItems,
  addItem: addIncomeItem,
  updateItem: updateIncomeItem,
  deleteItem: deleteIncomeItem,
} = createItemApi(db.incomeItems);
