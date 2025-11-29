interface FrequencyTextProps {
  children: React.ReactNode;
}

export function FrequencyText({ children }: FrequencyTextProps) {
  return <span className="text-xs text-gray-500">{children}</span>;
}
