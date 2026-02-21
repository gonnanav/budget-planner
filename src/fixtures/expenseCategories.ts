import { createCategory } from "domain/categories";

export const housing = createCategory({
  id: "housing",
  name: "Housing",
  section: "expenses",
});

export const transportation = createCategory({
  id: "transportation",
  name: "Transportation",
  section: "expenses",
});

export const food = createCategory({
  id: "food",
  name: "Food",
  section: "expenses",
});

export const personal = createCategory({
  id: "personal",
  name: "Personal",
  section: "expenses",
});
