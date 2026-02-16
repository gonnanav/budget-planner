import { useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import type { Item, Loadable, Section } from "domain/types";
import { ServicesContext } from "contexts/ServicesContext";

export function useItems(section: Section): Loadable<Item[]> {
  const { itemService } = useContext(ServicesContext);

  return useLiveQuery(
    async () => ({ status: "ready", data: await itemService.getItems(section) }),
    [section],
    { status: "loading" }
  );
}
