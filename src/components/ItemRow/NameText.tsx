import styles from "./NameText.module.css";

interface NameTextProps {
  children: React.ReactNode;
}

export function NameText({ children }: NameTextProps) {
  return <span className={styles.root}>{children}</span>;
}
