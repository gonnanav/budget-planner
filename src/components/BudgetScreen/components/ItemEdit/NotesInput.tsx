import { Textarea } from "@mantine/core";
import { CHARACTER_LIMITS } from "domain/limits";

interface NotesInputProps {
  notes?: string;
  onNotesChange: (notes: string) => void;
}

export function NotesInput({ notes = "", onNotesChange }: NotesInputProps) {
  return (
    <Textarea
      label="Notes"
      value={notes}
      onChange={(e) => onNotesChange(e.currentTarget.value)}
      maxLength={CHARACTER_LIMITS.itemNotes}
    />
  );
}
