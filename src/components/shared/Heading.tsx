interface HeadingProps {
  children: string;
}

export function Heading({ children }: HeadingProps) {
  return <h1 className="text-lg font-semibold">{children}</h1>;
}
