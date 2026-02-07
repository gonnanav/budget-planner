import { Header } from "./components/Header";
import styles from "./AppShell.module.css";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <Header />
        </div>
      </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
