import { Skeleton } from "@mantine/core";
import styles from "./LoadingPage.module.css";

export function LoadingPage() {
  return (
    <div className={styles.root}>
      <Skeleton className={styles.title} />
      <div className={styles.list}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className={styles.item} />
        ))}
      </div>
    </div>
  );
}
