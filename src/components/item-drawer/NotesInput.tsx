import { Textarea } from "@heroui/input";

interface NotesInputProps {
  notes?: string;
  onChange: (notes: string) => void;
}

export function NotesInput({ notes = "", onChange }: NotesInputProps) {
  return (
    <Textarea
      label="Notes"
      value={notes}
      onValueChange={onChange}
      placeholder="Add notes or details..."
    />
  );
}
