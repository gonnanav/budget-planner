import styles from "./SectionLayout.module.css";

interface SectionLayoutProps {
  addButton: React.ReactNode;
  tabs: React.ReactNode;
  children: React.ReactNode;
}

export function SectionLayout({
  addButton,
  tabs,
  children,
}: SectionLayoutProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.controls}>
          {tabs}
          {addButton}
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
