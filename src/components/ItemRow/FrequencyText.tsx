import styles from "./FrequencyText.module.css";

interface FrequencyTextProps {
  children: React.ReactNode;
}

export function FrequencyText({ children }: FrequencyTextProps) {
  return <span className={styles.root}>{children}</span>;
}
