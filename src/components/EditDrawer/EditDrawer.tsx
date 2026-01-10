import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { ActionButtons } from "components/ActionButtons";
import { ReactNode } from "react";

export interface EditDrawerProps {
  isOpen: boolean;
  headingText: string;
  hasDelete: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
  children: ReactNode;
}

export const EditDrawer = ({
  isOpen,
  headingText,
  hasDelete,
  onClose,
  onCancel,
  onSave,
  onDelete,
  children,
}: EditDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>{headingText}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>
          <ActionButtons
            hasDelete={hasDelete}
            onCancel={onCancel}
            onSave={onSave}
            onDelete={onDelete}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
