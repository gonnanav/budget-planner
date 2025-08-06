import { type ReactNode } from "react";
import classes from "./BackupCard.module.css";

type BackupCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function BackupCard({ title, description, children }: BackupCardProps) {
  return (
    <section className={classes.root}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.description}>{description}</p>
      {children}
    </section>
  );
}
