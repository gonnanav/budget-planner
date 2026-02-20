import { createItem } from "domain/items";
import { bills, personal } from "./expense-categories";

export const electricity = createItem({
  id: "electricity",
  name: "Electricity",
  amount: 150,
  categoryId: bills.id,
  section: "expenses",
});

export const water = createItem({
  id: "water",
  name: "Water",
  amount: 80,
  categoryId: bills.id,
  section: "expenses",
});

export const gas = createItem({
  id: "gas",
  name: "Gas",
  amount: 120,
  categoryId: bills.id,
  section: "expenses",
});

export const diningOut = createItem({
  id: "dining-out",
  name: "Dining Out",
  amount: 250,
  categoryId: personal.id,
  section: "expenses",
});

export const hobbies = createItem({
  id: "hobbies",
  name: "Hobbies",
  amount: 200,
  categoryId: personal.id,
  section: "expenses",
});

export const expenseItems = [electricity, water, gas, diningOut, hobbies];
