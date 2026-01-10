import styles from "./AmountText.module.css";

interface AmountTextProps {
  children: React.ReactNode;
}

export function AmountText({ children }: AmountTextProps) {
  return <span className={styles.root}>{children}</span>;
}
