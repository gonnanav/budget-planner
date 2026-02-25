import { Skeleton } from "@mantine/core";
import classes from "./LoadingPage.module.css";

export function LoadingPage() {
  return (
    <div className={classes.root}>
      <Skeleton className={classes.title} />
      <div className={classes.list}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className={classes.item} />
        ))}
      </div>
    </div>
  );
}
