import { createItem } from "domain/items";
import { employment, passive } from "./incomeCategories";

export const salary = createItem({
  id: "income-salary",
  name: "Salary",
  amount: 5000,
  categoryId: employment.id,
  section: "income",
});

export const freelance = createItem({
  id: "income-freelance",
  name: "Freelance",
  amount: 800,
  categoryId: employment.id,
  section: "income",
});

export const investment = createItem({
  id: "income-investment",
  name: "Investment Returns",
  amount: 300,
  categoryId: passive.id,
  section: "income",
});

