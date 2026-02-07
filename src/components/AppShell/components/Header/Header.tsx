import { Link, useLocation } from "react-router-dom";
import { ActionIcon } from "@mantine/core";
import { Database } from "lucide-react";
import styles from "./Header.module.css";

export function Header() {
  const { pathname } = useLocation();
  const isDataPage = pathname === "/data";

  return (
    <header className={styles.root}>
      <div className={styles.row}>
        <Link to="/" className={styles.title}>
          Budget Planner
        </Link>
        {!isDataPage && (
          <ActionIcon
            component={Link}
            to="/data"
            aria-label="Data management"
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
