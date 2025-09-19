import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { AmountInput } from "./AmountInput";

interface BudgetEntryModalProps {
  title: string;
  isOpen: boolean;
  onSave: (amount: number) => void;
  onClose: () => void;
}

export const BudgetEntryModal = ({
  title,
  isOpen,
  onSave,
  onClose,
}: BudgetEntryModalProps) => {
  const [amount, setAmount] = useState<number | null>(null);

  const handleAmountChange = (amount: number | null) => {
    setAmount(amount ?? 0);
  };

  const reset = () => {
    setAmount(null);
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleSave = () => {
    onSave(amount ?? 0);
    handleClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} placement="center">
      <Form onSubmit={handleSubmit}>
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
                <Button color="primary" type="submit">
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Form>
    </Modal>
  );
};
