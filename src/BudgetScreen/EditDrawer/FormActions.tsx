import { ActionIcon, Button } from "@mantine/core";
import { Trash2 } from "lucide-react";
import classes from "./EditDrawer.module.css";

export type FormActionsProps = {
  hasDelete: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

export function FormActions({ hasDelete, onCancel, onDelete }: FormActionsProps) {
  return (
    <div className={classes.actions}>
      <div className={classes.primaryActions}>
        <Button variant="default" type="button" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
      {hasDelete && (
        <ActionIcon variant="subtle" color="red" size="lg" type="button" onClick={onDelete} aria-label="Delete">
          <Trash2 size={20} />
        </ActionIcon>
      )}
    </div>
  );
}
