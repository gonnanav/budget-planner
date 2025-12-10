interface EmptyStateTextProps {
  children: React.ReactNode;
}

export function EmptyStateText({ children }: EmptyStateTextProps) {
  return <p className="text-sm text-center text-gray-400">{children}</p>;
}
