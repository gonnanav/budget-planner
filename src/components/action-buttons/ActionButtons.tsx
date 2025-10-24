import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";

interface ActionButtonsProps {
  onCancel: () => void;
  onDelete?: () => void;
}

export const ActionButtons = ({ onCancel, onDelete }: ActionButtonsProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <Button color="danger" variant="light" onPress={onCancel}>
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Save
        </Button>
      </div>

      {onDelete && (
        <div>
          <Button
            color="danger"
            onPress={onDelete}
            isIconOnly
            aria-label="Delete"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};
