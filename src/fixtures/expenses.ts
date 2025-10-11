import { createEntry } from "@/core/budget-entries";

export const rent = createEntry({
  id: "expense-rent",
  name: "Rent",
  amount: 2800,
});

export const groceries = createEntry({
  id: "expense-groceries",
  name: "Groceries",
  amount: 600,
});

export const diningOut = createEntry({
  id: "expense-dining-out",
  name: "Dining Out",
  amount: 250,
});
