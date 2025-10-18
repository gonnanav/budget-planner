import { createEntry } from "@/core/budget-entries";

export const salary = createEntry({
  id: "income-salary",
  name: "Salary",
  amount: 5000,
  categoryId: "category-transportation", // Assigning to Transportation category
});

export const allowance = createEntry({
  id: "income-allowance",
  name: "Allowance",
  amount: 1200,
  categoryId: "category-shopping", // Assigning to Shopping category
});

export const investment = createEntry({
  id: "income-investment",
  name: "Investment Returns",
  amount: 300,
  categoryId: "category-entertainment", // Assigning to Entertainment category
});
