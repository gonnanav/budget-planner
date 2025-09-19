import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";
import { AmountInput } from "./AmountInput";

import { BudgetEntry } from "./types";

interface BudgetEntryModalProps {
  title: string;
  isOpen: boolean;
  amount?: BudgetEntry | null;
  onSave: (amount: number) => void;
  onClose: () => void;
  onDelete?: () => void;
}

export const BudgetEntryModal = ({
  title,
  isOpen,
  amount: entryAmount,
  onSave,
  onClose,
  onDelete,
}: BudgetEntryModalProps) => {
  const [amount, setAmount] = useState<number | null>(null);
  const isEditMode = entryAmount !== null;

  useEffect(() => {
    if (!entryAmount) return;

    setAmount(entryAmount.amount);
  }, [entryAmount]);

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

  const handleDelete = () => {
    onDelete?.();
    handleClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} placement="top-center">
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
                {isEditMode && (
                  <Button
                    color="danger"
                    onPress={handleDelete}
                    isIconOnly
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
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
