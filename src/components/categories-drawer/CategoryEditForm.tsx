import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";

interface CategoryEditFormProps {
  initialValue?: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export const CategoryEditForm = ({
  initialValue = "",
  onSave,
  onCancel,
  onDelete,
}: CategoryEditFormProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    if (value.trim()) {
      onSave(value.trim());
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          value={value}
          onValueChange={setValue}
          autoFocus={true}
          placeholder="Enter category name"
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button size="sm" color="danger" variant="light" onPress={onCancel}>
              Cancel
            </Button>
            <Button size="sm" color="primary" onPress={handleSave}>
              Save
            </Button>
          </div>
          {onDelete && (
            <Button
              size="sm"
              color="danger"
              onPress={onDelete}
              isIconOnly
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
