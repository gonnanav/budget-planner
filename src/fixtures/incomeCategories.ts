import { createCategory } from "domain/categories";

export const employment = createCategory({
  id: "employment",
  name: "Employment",
  section: "income",
});

export const passive = createCategory({
  id: "passive",
  name: "Passive",
  section: "income",
});
