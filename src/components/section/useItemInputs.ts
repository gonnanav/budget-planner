import { useState } from "react";
import { Frequency } from "@/core/types";

export function useItemInputs() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [categoryId, setCategoryId] = useState<string>();
  const [notes, setNotes] = useState<string>();

  const reset = () => {
    setName("");
    setAmount(null);
    setFrequency("monthly");
    setCategoryId(undefined);
    setNotes("");
  };

  const copy = (item: {
    name: string;
    amount: number | null;
    frequency: Frequency;
    categoryId?: string;
    notes?: string;
  }) => {
    setName(item.name);
    setAmount(item.amount);
    setFrequency(item.frequency);
    setCategoryId(item.categoryId);
    setNotes(item.notes);
  };

  return {
    name,
    amount,
    frequency,
    categoryId,
    notes,
    onNameChange: setName,
    onAmountChange: setAmount,
    onFrequencyChange: setFrequency,
    onCategoryIdChange: setCategoryId,
    onNotesChange: setNotes,
    onReset: reset,
    onCopy: copy,
  };
}
