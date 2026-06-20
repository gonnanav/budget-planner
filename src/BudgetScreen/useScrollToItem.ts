import { useEffect, useRef, useState, type RefObject } from "react";
import type { Budget } from "./types";

export type UseScrollToItem = {
  viewportRef: RefObject<HTMLDivElement | null>;
  updateScrollTarget: (id: string) => void;
};

export function useScrollToItem(budget: Budget | undefined): UseScrollToItem {
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);
  const scrolledIdRef = useRef<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!budget || !pendingScrollId || scrolledIdRef.current === pendingScrollId || !hasItem(budget, pendingScrollId)) return;

    scrolledIdRef.current = pendingScrollId;
    const row = viewportRef.current?.querySelector(`[data-item-id="${pendingScrollId}"]`);
    row?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [budget, pendingScrollId]);

  const updateScrollTarget = (id: string) => {
    setPendingScrollId(id);
  };

  return { viewportRef, updateScrollTarget };
}

function hasItem(budget: Budget, id: string): boolean {
  return (
    budget.income.items.some((item) => item.id === id) ||
    budget.expenses.items.some((item) => item.id === id)
  );
}
