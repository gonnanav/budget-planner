import { useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import type { Category, Loadable, Section } from "core/types";
import { CategoryServiceContext } from "contexts/CategoryServiceContext";

export function useCategories(section: Section): Loadable<Category[]> {
  const { getCategories } = useContext(CategoryServiceContext);

  return useLiveQuery(
    async () => ({ status: "ready", data: await getCategories(section) }),
    [section],
    { status: "loading" }
  );
}
