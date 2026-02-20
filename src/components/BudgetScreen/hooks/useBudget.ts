import { useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import type { Budget, Loadable } from "domain/types";
import { ServicesContext } from "contexts/ServicesContext";

export function useBudget(): Loadable<Budget> {
  const { budgetService } = useContext(ServicesContext);

  return useLiveQuery(
    async () => ({ status: "ready" as const, data: await budgetService.getBudget() }),
    [],
    { status: "loading" as const },
  );
}
