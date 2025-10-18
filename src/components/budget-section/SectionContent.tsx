import { ReactNode } from "react";
import { EmptyState } from "./EmptyState";

interface SectionContentProps {
  isEmpty: boolean;
  emptyMessage: string;
  children: ReactNode[];
}

export function SectionContent({
  isEmpty,
  emptyMessage,
  children,
}: SectionContentProps) {
  return (
    <div className="space-y-3">
      {isEmpty ? (
        <EmptyState>{emptyMessage}</EmptyState>
      ) : (
        <div className="flex flex-col gap-px">{children}</div>
      )}
    </div>
  );
}
