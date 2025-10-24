interface AmountTextProps {
  children: React.ReactNode;
}

export function AmountText({ children }: AmountTextProps) {
  return <span className="text-sm text-gray-900">{children}</span>;
}
