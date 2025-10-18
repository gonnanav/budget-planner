interface SectionListItemProps {
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function SectionListItem({
  ariaLabel,
  onClick,
  children,
}: SectionListItemProps) {
  return (
    <article
      aria-label={ariaLabel}
      className="flex items-baseline justify-between rounded-md px-3 py-2 cursor-pointer bg-slate-50 hover:opacity-80 active:bg-slate-100 transition-colors transition-opacity"
      onClick={onClick}
    >
      <div className="flex items-baseline justify-between w-full gap-3">
        {children}
      </div>
    </article>
  );
}
