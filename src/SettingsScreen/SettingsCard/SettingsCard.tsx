import { type ReactNode } from "react";
import { clsx } from "clsx";
import classes from "./SettingsCard.module.css";

type SettingsCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function SettingsCard({ title, description, children, className }: SettingsCardProps) {
  return (
    <section className={clsx(classes.root, className)}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.description}>{description}</p>
      {children}
    </section>
  );
}
