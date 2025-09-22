import { Input } from "@heroui/input";

interface NameInputProps {
  label: string;
  name: string | null;
  className?: string;
  onChange: (name: string | null) => void;
}

export function NameInput({
  label,
  name,
  className,
  onChange,
}: NameInputProps) {
  const handleChange = (value: string) => {
    onChange(fromValue(value));
  };

  return (
    <Input
      label={label}
      value={toValue(name)}
      className={className}
      onValueChange={handleChange}
    />
  );
}

function toValue(name: string | null): string {
  return name ?? "";
}

function fromValue(value: string): string | null {
  return value.trim() === "" ? null : value;
}
