import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { ActionButtons } from "@/components/action-buttons";
import { CategoryDraft } from "@/components/shared/types";
import { CategoryNameInput } from "./CategoryNameInput";

export interface CategoryDrawerProps {
  isOpen: boolean;
  heading: string;
  draft: CategoryDraft;
  onClose: () => void;
  onDraftChange: (changes: Partial<CategoryDraft>) => void;
  onCancel: () => void;
  onSave: (draft: CategoryDraft) => void;
  onDelete?: () => void;
}

export const CategoryDrawer = ({
  isOpen,
  heading,
  draft,
  onClose,
  onDraftChange,
  onCancel,
  onSave,
  onDelete,
}: CategoryDrawerProps) => {
  const handleNameChange = (name: string) => onDraftChange({ name });

  const handleSave = () => {
    onSave(draft);
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>{heading}</DrawerHeader>
        <DrawerBody>
          <CategoryNameInput name={draft.name} onChange={handleNameChange} />
        </DrawerBody>
        <DrawerFooter>
          <ActionButtons
            onCancel={onCancel}
            onSave={handleSave}
            onDelete={onDelete}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
