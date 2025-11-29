interface SecondaryLineProps {
  children: React.ReactNode;
}

export function SecondaryLine({ children }: SecondaryLineProps) {
  return (
    <div className="flex items-center justify-between w-full gap-3 mt-1">
      {children}
    </div>
  );
}
