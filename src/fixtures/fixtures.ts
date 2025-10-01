import { createEntry } from "@/core/budget-entries";

// Income fixtures
export const salary = createEntry({
  id: "income-salary",
  name: "Salary",
  amount: 5000,
});

export const allowance = createEntry({
  id: "income-allowance",
  name: "Allowance",
  amount: 1200,
});

export const investment = createEntry({
  id: "income-investment",
  name: "Investment Returns",
  amount: 300,
});

// Expense fixtures
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
