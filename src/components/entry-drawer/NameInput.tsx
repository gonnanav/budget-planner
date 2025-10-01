import { Input } from "@heroui/input";

interface NameInputProps {
  name: string;
  className?: string;
  onChange: (name: string) => void;
}

export function NameInput({ name, className, onChange }: NameInputProps) {
  return (
    <Input
      label="Name"
      value={name}
      className={className}
      onValueChange={onChange}
    />
  );
}
