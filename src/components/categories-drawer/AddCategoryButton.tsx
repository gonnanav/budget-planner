import { Button } from "@heroui/button";
import { Plus } from "lucide-react";

interface AddCategoryButtonProps {
  isDisabled: boolean;
  onAdd: () => void;
}

export const AddCategoryButton = ({
  isDisabled,
  onAdd,
}: AddCategoryButtonProps) => {
  return (
    <Button
      size="sm"
      color="primary"
      isDisabled={isDisabled}
      onPress={onAdd}
      startContent={<Plus size={16} />}
      className="self-start"
    >
      Add Category
    </Button>
  );
};
