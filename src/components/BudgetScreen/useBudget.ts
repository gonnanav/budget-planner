import { useLiveQuery } from "dexie-react-hooks";
import type { Budget, Loadable } from "@/domain/types";
import { getBudget } from "@/services/budget";

export function useBudget(): Loadable<Budget> {
  return useLiveQuery(
    async () => ({ status: "ready" as const, data: await getBudget() }),
    [],
    { status: "loading" as const },
  );
}
