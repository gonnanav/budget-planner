interface SectionLayoutProps {
  heading: React.ReactNode;
  addButton: React.ReactNode;
  children: React.ReactNode;
}

export function SectionLayout({
  heading,
  addButton,
  children,
}: SectionLayoutProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {heading}
        {addButton}
      </div>
      {children}
    </div>
  );
}
