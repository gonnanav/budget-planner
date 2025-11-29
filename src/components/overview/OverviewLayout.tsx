import { ReactNode } from "react";

interface OverviewLayoutProps {
  heading: ReactNode;
  banner: ReactNode;
  cards: ReactNode;
}

export function OverviewLayout({
  heading,
  banner,
  cards,
}: OverviewLayoutProps) {
  return (
    <div className="space-y-4">
      {heading}
      {banner}
      <div className="grid grid-cols-2 gap-3">{cards}</div>
    </div>
  );
}
