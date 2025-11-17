interface SectionLayoutProps {
  heading: React.ReactNode;
  addButton: React.ReactNode;
  tabs: React.ReactNode;
  view: "items" | "categories";
  items: React.ReactNode;
  categories: React.ReactNode;
}

export function SectionLayout({
  heading,
  addButton,
  tabs,
  view,
  items,
  categories,
}: SectionLayoutProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {heading}
        {addButton}
      </div>
      {tabs}
      {view === "items" && items}
      {view === "categories" && categories}
    </div>
  );
}
