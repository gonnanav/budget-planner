import { createEntry } from "@/core/budget-entries";
import { bills, personal } from "./expense-categories";

export const electricity = createEntry({
  id: "electricity",
  name: "Electricity",
  amount: 150,
  categoryId: bills.id,
});

export const water = createEntry({
  id: "water",
  name: "Water",
  amount: 80,
  categoryId: bills.id,
});

export const gas = createEntry({
  id: "gas",
  name: "Gas",
  amount: 120,
  categoryId: bills.id,
});

export const diningOut = createEntry({
  id: "dining-out",
  name: "Dining Out",
  amount: 250,
  categoryId: personal.id,
});

export const hobbies = createEntry({
  id: "hobbies",
  name: "Hobbies",
  amount: 200,
  categoryId: personal.id,
});
