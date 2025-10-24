import { cn } from "@/lib/utils";

interface ItemLayoutProps {
  name: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function ItemLayout({ name, onClick, children }: ItemLayoutProps) {
  return (
    <article
      aria-label={name}
      className={cn(
        "flex flex-col rounded-md px-3 py-2 cursor-pointer",
        "bg-slate-50 hover:opacity-80 active:bg-slate-100",
        "transition-colors transition-opacity",
      )}
      onClick={onClick}
    >
      {children}
    </article>
  );
}
