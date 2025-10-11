import { createEntry } from "@/core/budget-entries";

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
