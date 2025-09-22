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
import { BudgetEntry, BudgetEntryInput } from "./core/types";
import { AmountInput } from "./AmountInput";
import { NameInput } from "./NameInput";

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
  const [name, setName] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const isEditMode = entry !== null;

  useEffect(() => {
    if (!entry) return;

    setName(entry.name ?? null);
    setAmount(entry.amount);
  }, [entry]);

  const handleNameChange = (name: string | null) => {
    setName(name);
  };

  const handleAmountChange = (amount: number | null) => {
    setAmount(amount);
  };

  const reset = () => {
    setName(null);
    setAmount(null);
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleSave = () => {
    onSave({ name: name ?? "", amount });
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
                <NameInput
                  label="Name"
                  name={name}
                  onChange={handleNameChange}
                />
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
