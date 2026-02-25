import { Link, useLocation } from "react-router-dom";
import { ActionIcon } from "@mantine/core";
import { Database } from "lucide-react";
import classes from "./Header.module.css";

export function Header() {
  const { pathname } = useLocation();
  const isBackupPage = pathname === "/backup";

  return (
    <header className={classes.root}>
      <div className={classes.row}>
        <Link to="/" className={classes.title}>
          Budget Planner
        </Link>
        {!isBackupPage && (
          <ActionIcon
            component={Link}
            to="/backup"
            aria-label="Backup"
            size="sm"
            variant="subtle"
          >
            <Database size={16} />
          </ActionIcon>
        )}
      </div>
    </header>
  );
}
