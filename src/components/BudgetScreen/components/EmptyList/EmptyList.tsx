import type { Entity } from "core/types";
import styles from "./EmptyList.module.css";

interface EmptyListProps {
  entity: Entity;
}

export function EmptyList({ entity }: EmptyListProps) {
  const text = entity === "item" ? "No items yet." : "No categories yet.";

  return <p className={styles.root}>{text}</p>;
}
