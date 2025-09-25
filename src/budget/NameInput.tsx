import { Input } from "@heroui/input";

interface NameInputProps {
  name: string | null;
  className?: string;
  onChange: (name: string | null) => void;
}

export function NameInput({ name, className, onChange }: NameInputProps) {
  const handleChange = (value: string) => {
    onChange(fromValue(value));
  };

  return (
    <Input
      label="Name"
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
