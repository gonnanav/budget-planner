import { useEffect, useRef, type RefObject } from "react";
import type { Budget } from "./types";

export function useScrollToItem(
  budget: Budget | undefined,
  itemId: string | null,
): RefObject<HTMLDivElement | null> {
  const scrolledIdRef = useRef<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!budget || !itemId || scrolledIdRef.current === itemId || !hasItem(budget, itemId)) return;

    scrolledIdRef.current = itemId;
    const row = viewportRef.current?.querySelector(`[data-item-id="${itemId}"]`);
    row?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [budget, itemId]);

  return viewportRef;
}

function hasItem(budget: Budget, id: string): boolean {
  return (
    budget.income.items.some((item) => item.id === id) ||
    budget.expenses.items.some((item) => item.id === id)
  );
}
