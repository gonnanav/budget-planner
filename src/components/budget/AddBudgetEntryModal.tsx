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
  const [amount, setAmount] = useState<number | null>(null);

  const handleAmountChange = (amount: number | null) => {
    setAmount(amount ?? 0);
  };

  const reset = () => {
    setAmount(null);
  };

  const handleSave = () => {
    onSave(amount ?? 0);
    onClose();
    reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
