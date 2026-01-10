import styles from "./ItemRowLayout.module.css";

interface ItemRowLayoutProps {
  name: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function ItemRowLayout({ name, onClick, children }: ItemRowLayoutProps) {
  return (
    <article aria-label={name} className={styles.root} onClick={onClick}>
      {children}
    </article>
  );
}
