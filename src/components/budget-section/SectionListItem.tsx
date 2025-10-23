import { cn } from "@/lib/utils";

interface SectionListItemProps {
  name: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function SectionListItem({
  name,
  onClick,
  children,
}: SectionListItemProps) {
  return (
    <li
      className={cn(
        "flex items-baseline justify-between rounded-md px-3 py-2",
        "cursor-pointer bg-slate-50 hover:opacity-80 active:bg-slate-100 transition-colors transition-opacity",
      )}
      onClick={onClick}
    >
      <div className="flex items-baseline justify-between w-full gap-3">
        <span className="text-muted-foreground text-sm truncate">{name}</span>
        {children}
      </div>
    </li>
  );
}
