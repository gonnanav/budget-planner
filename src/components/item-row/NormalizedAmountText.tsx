interface NormalizedAmountTextProps {
  children: React.ReactNode;
}

export function NormalizedAmountText({ children }: NormalizedAmountTextProps) {
  return <span className="text-xs text-gray-500">{children}</span>;
}
