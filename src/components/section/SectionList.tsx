import { ReactNode } from "react";
import styles from "./SectionList.module.css";
import { EmptyStateText } from "./EmptyStateText";

interface SectionListProps<T> {
  items: T[];
  emptyText: string;
  children: (item: T) => ReactNode;
}

export function SectionList<T>({
  items,
  emptyText,
  children,
}: SectionListProps<T>) {
  if (items.length === 0) return <EmptyStateText>{emptyText}</EmptyStateText>;

  return <ul className={styles.root}>{items.map(children)}</ul>;
}
