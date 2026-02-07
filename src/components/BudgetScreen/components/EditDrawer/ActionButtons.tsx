import { Button, ActionIcon } from "@mantine/core";
import { Trash2 } from "lucide-react";
import styles from "./ActionButtons.module.css";

interface ActionButtonsProps {
  hasDelete: boolean;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
}

export const ActionButtons = ({
  hasDelete,
  onCancel,
  onSave,
  onDelete,
}: ActionButtonsProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.group}>
        <Button color="red" variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" onClick={onSave}>
          Save
        </Button>
      </div>

      {hasDelete && (
        <div className={styles.delete}>
          <ActionIcon
            color="red"
            onClick={onDelete}
            aria-label="Delete"
          >
            <Trash2 size={16} />
          </ActionIcon>
        </div>
      )}
    </div>
  );
};
