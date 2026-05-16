import { Header } from "./Header";
import classes from "./AppShell.module.css";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.main}>{children}</main>
    </div>
  );
}
