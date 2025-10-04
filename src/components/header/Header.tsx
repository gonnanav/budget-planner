import { ExportButton } from "./ExportButton";
import { NavTabs } from "./NavTabs";

export function Header() {
  return (
    <header className="flex flex-col gap-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold tracking-tight">
          Budget Planner
        </span>
        <ExportButton />
      </div>
      <NavTabs />
    </header>
  );
}
