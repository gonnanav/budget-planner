import { Textarea } from "@mantine/core";
import { characterLimits } from "../budget";

type NotesInputProps = {
  notes: string;
  onNotesChange: (notes: string) => void;
};

export function NotesInput({ notes, onNotesChange }: NotesInputProps) {
  return (
    <Textarea
      label="Notes"
      value={notes}
      onChange={(e) => onNotesChange(e.currentTarget.value)}
      maxLength={characterLimits.itemNotes}
    />
  );
}
