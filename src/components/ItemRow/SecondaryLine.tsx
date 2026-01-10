import styles from "./SecondaryLine.module.css";

interface SecondaryLineProps {
  children: React.ReactNode;
}

export function SecondaryLine({ children }: SecondaryLineProps) {
  return <div className={styles.root}>{children}</div>;
}
