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
import { BudgetEntry, BudgetEntryInput } from "./types";
import { AmountInput } from "./AmountInput";

interface BudgetEntryModalProps {
  title: string;
  isOpen: boolean;
  entry?: BudgetEntry | null;
  onSave: (input: BudgetEntryInput) => void;
  onClose: () => void;
  onDelete?: () => void;
}

export const BudgetEntryModal = ({
  title,
  isOpen,
  entry,
  onSave,
  onClose,
  onDelete,
}: BudgetEntryModalProps) => {
  const [amount, setAmount] = useState<number | null>(null);
  const isEditMode = entry !== null;

  useEffect(() => {
    if (!entry) return;

    setAmount(entry.amount);
  }, [entry]);

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
    onSave({ amount: amount ?? 0 });
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
