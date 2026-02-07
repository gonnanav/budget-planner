"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { Database } from "lucide-react";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const isDataPage = pathname === "/data";

  return (
    <header className={styles.root}>
      <div className={styles.row}>
        <Link href="/" className={styles.title}>
          Budget Planner
        </Link>
        {!isDataPage && (
          <Button
            as={Link}
            href="/data"
            aria-label="Data management"
            size="sm"
            isIconOnly
            variant="light"
          >
            <Database size={16} />
          </Button>
        )}
      </div>
    </header>
  );
}
