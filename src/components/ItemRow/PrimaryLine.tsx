import styles from "./PrimaryLine.module.css";

interface PrimaryLineProps {
  children: React.ReactNode;
}

export function PrimaryLine({ children }: PrimaryLineProps) {
  return <div className={styles.root}>{children}</div>;
}
