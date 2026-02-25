import { Header } from "./components/Header";
import classes from "./AppShell.module.css";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerInner}>
          <Header />
        </div>
      </div>

      <main className={classes.main}>{children}</main>
    </div>
  );
}
