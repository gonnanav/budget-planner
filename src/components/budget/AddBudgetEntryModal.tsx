import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { AmountInput } from "./AmountInput";

interface AddBudgetEntryModalProps {
  title: string;
  isOpen: boolean;
  onSave: (amount: number) => void;
  onClose: () => void;
}

export const AddBudgetEntryModal = ({
  title,
  isOpen,
  onSave,
  onClose,
}: AddBudgetEntryModalProps) => {
  const [amount, setAmount] = useState<number>(0);

  const handleAmountChange = (amount: number | null) => {
    setAmount(amount ?? 0);
  };

  const handleSave = () => {
    onSave(amount);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              <AmountInput
                label="Amount"
                amount={amount}
                onChange={handleAmountChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
