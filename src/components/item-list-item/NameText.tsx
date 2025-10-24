interface NameTextProps {
  children: React.ReactNode;
}

export function NameText({ children }: NameTextProps) {
  return (
    <span className="text-muted-foreground text-sm truncate">{children}</span>
  );
}
