interface SectionContentLayoutProps {
  children: React.ReactNode;
}

export function SectionContentLayout({ children }: SectionContentLayoutProps) {
  return <div className="space-y-3">{children}</div>;
}
