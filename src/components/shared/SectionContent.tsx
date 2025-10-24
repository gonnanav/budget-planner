import { ReactNode } from "react";
import { EmptyStateText } from "./EmptyStateText";

interface SectionContentProps<T> {
  items: T[];
  emptyStateText: string;
  children: (item: T) => ReactNode;
}

export function SectionContent<T>({
  items,
  emptyStateText,
  children,
}: SectionContentProps<T>) {
  const isEmpty = items.length === 0;

  return (
    <div className="space-y-3">
      {isEmpty ? (
        <EmptyStateText>{emptyStateText}</EmptyStateText>
      ) : (
        <ul className="flex flex-col gap-px">{items.map(children)}</ul>
      )}
    </div>
  );
}
