import styles from "./EmptyStateText.module.css";

interface EmptyStateTextProps {
  children: React.ReactNode;
}

export function EmptyStateText({ children }: EmptyStateTextProps) {
  return <p className={styles.root}>{children}</p>;
}
