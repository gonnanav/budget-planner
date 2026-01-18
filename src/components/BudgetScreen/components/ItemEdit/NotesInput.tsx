import { Textarea } from "@heroui/input";
import { CHARACTER_LIMITS } from "lib/limits";

interface NotesInputProps {
  notes?: string;
  onNotesChange: (notes: string) => void;
}

export function NotesInput({ notes = "", onNotesChange }: NotesInputProps) {
  return (
    <Textarea
      label="Notes"
      value={notes}
      onValueChange={onNotesChange}
      maxLength={CHARACTER_LIMITS.itemNotes}
    />
  );
}
