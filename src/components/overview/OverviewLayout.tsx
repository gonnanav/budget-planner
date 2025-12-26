import { ReactNode } from "react";

interface OverviewLayoutProps {
  banner: ReactNode;
  cards: ReactNode;
}

export function OverviewLayout({ banner, cards }: OverviewLayoutProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">{cards}</div>
      {banner}
    </div>
  );
}
