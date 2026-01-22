import { createCategory } from "core/categories";

export const bills = createCategory({
  id: "bills",
  name: "Bills",
  section: "expenses",
});
export const personal = createCategory({
  id: "personal",
  name: "Personal",
  section: "expenses",
});
export const transportation = createCategory({
  id: "transportation",
  name: "Transportation",
  section: "expenses",
});
