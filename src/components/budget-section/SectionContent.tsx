import { ReactNode } from "react";
import { EmptyState } from "./EmptyState";

interface SectionContentProps<T> {
  items: T[];
  emptyMessage: string;
  children: (item: T) => ReactNode;
}

export function SectionContent<T>({
  items,
  emptyMessage,
  children,
}: SectionContentProps<T>) {
  const isEmpty = items.length === 0;

  return (
    <div className="space-y-3">
      {isEmpty ? (
        <EmptyState>{emptyMessage}</EmptyState>
      ) : (
        <div className="flex flex-col gap-px">
          {items.map((item) => children(item))}
        </div>
      )}
    </div>
  );
}
