import { ReactNode } from "react";

interface SectionListProps<T> {
  items: T[];
  empty: ReactNode;
  children: (item: T) => ReactNode;
}

export function SectionList<T>({
  items,
  empty,
  children,
}: SectionListProps<T>) {
  if (items.length === 0) return empty;

  return <ul className="flex flex-col gap-px">{items.map(children)}</ul>;
}
