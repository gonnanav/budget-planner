import { type ReactNode } from "react";
import classes from "./SettingsCard.module.css";

type SettingsCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <section className={classes.root}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.description}>{description}</p>
      {children}
    </section>
  );
}
