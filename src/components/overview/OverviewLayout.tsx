import { ReactNode } from "react";
import styles from "./OverviewLayout.module.css";

interface OverviewLayoutProps {
  banner: ReactNode;
  cards: ReactNode;
}

export function OverviewLayout({ banner, cards }: OverviewLayoutProps) {
  return (
    <div className={styles.root}>
      <div className={styles.cards}>{cards}</div>
      {banner}
    </div>
  );
}
