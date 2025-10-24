interface PrimaryLineProps {
  children: React.ReactNode;
}

export function PrimaryLine({ children }: PrimaryLineProps) {
  return (
    <div className="flex items-baseline justify-between w-full gap-3">
      {children}
    </div>
  );
}
