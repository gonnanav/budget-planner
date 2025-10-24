import { DataMenu } from "./DataMenu";

export function Header() {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold tracking-tight">
          Budget Planner
        </span>
        <DataMenu />
      </div>
    </header>
  );
}
