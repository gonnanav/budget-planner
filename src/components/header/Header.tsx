import { BackupButton } from "./BackupButton";
import { RestoreButton } from "./RestoreButton";

export function Header() {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold tracking-tight">
          Budget Planner
        </span>
        <div className="flex items-center gap-2">
          <RestoreButton />
          <BackupButton />
        </div>
      </div>
    </header>
  );
}
