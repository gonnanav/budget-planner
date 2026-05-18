import { Link } from "react-router-dom";
import { ActionIcon } from "@mantine/core";
import { Database } from "lucide-react";
import classes from "./AppShell.module.css";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Link to="/" className={classes.logoLink}>
          <img src="/even-logo.png" alt="Even" className={classes.logo} />
        </Link>
        <ActionIcon
          component={Link}
          to="/backup"
          aria-label="Backup"
          size="lg"
          variant="default"
        >
          <Database size={18} />
        </ActionIcon>
      </header>
      <main className={classes.main}>{children}</main>
    </div>
  );
}
