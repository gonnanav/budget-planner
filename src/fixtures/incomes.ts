import { createItem } from "core/items";

export const salary = createItem({
  id: "income-salary",
  name: "Salary",
  amount: 5000,
  categoryId: "category-transportation", // Assigning to Transportation category
});

export const allowance = createItem({
  id: "income-allowance",
  name: "Allowance",
  amount: 1200,
  categoryId: "category-shopping", // Assigning to Shopping category
});

export const investment = createItem({
  id: "income-investment",
  name: "Investment Returns",
  amount: 300,
  categoryId: "category-entertainment", // Assigning to Entertainment category
});
