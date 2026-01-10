import styles from "./NormalizedAmountText.module.css";

interface NormalizedAmountTextProps {
  children: React.ReactNode;
}

export function NormalizedAmountText({ children }: NormalizedAmountTextProps) {
  return <span className={styles.root}>{children}</span>;
}
