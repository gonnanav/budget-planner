import { useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import type { Item, Loadable, Section } from "domain/types";
import { ItemServiceContext } from "contexts/ItemServiceContext";

export function useItems(section: Section): Loadable<Item[]> {
  const { getItems } = useContext(ItemServiceContext);

  return useLiveQuery(
    async () => ({ status: "ready", data: await getItems(section) }),
    [section],
    { status: "loading" }
  );
}
