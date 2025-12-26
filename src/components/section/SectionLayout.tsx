interface SectionLayoutProps {
  heading: React.ReactNode;
  backButton?: React.ReactNode;
  addButton: React.ReactNode;
  tabs: React.ReactNode;
  children: React.ReactNode;
}

export function SectionLayout({
  heading,
  backButton,
  addButton,
  tabs,
  children,
}: SectionLayoutProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {backButton}
          {heading}
        </div>
        {addButton}
      </div>
      {tabs}
      {children}
    </div>
  );
}
