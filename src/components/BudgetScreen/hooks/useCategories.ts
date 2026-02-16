import { useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import type { Category, Loadable, Section } from "domain/types";
import { ServicesContext } from "contexts/ServicesContext";

export function useCategories(section: Section): Loadable<Category[]> {
  const { categoryService } = useContext(ServicesContext);

  return useLiveQuery(
    async () => ({ status: "ready", data: await categoryService.getCategories(section) }),
    [section],
    { status: "loading" }
  );
}
