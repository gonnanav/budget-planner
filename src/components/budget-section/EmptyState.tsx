interface EmptyStateProps {
  children: React.ReactNode;
}

export function EmptyState({ children }: EmptyStateProps) {
  return <p className="text-sm text-center text-gray-400">{children}</p>;
}
