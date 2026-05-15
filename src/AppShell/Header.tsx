import { Link } from "react-router-dom";
import { ActionIcon } from "@mantine/core";
import { Database } from "lucide-react";
import classes from "./Header.module.css";

export function Header() {
  return (
    <header className={classes.root}>
      <div className={classes.row}>
        <Link to="/" className={classes.title}>
          Budget Planner
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
      </div>
    </header>
  );
}
