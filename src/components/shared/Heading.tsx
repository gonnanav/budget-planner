import styles from "./Heading.module.css";

interface HeadingProps {
  children: string;
}

export function Heading({ children }: HeadingProps) {
  return <h1 className={styles.root}>{children}</h1>;
}
