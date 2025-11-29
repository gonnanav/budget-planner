import { Select, SelectItem } from "@heroui/select";
import { Selection } from "@heroui/react";
import { Frequency } from "@/core/types";

interface FrequencyInputProps {
  frequency: Frequency;
  onFrequencyChange: (frequency: Frequency) => void;
}

export const FrequencyInput = ({
  frequency,
  onFrequencyChange,
}: FrequencyInputProps) => {
  const selectedKeys = [frequency];

  const handleSelectionChange = (keys: Selection) => {
    const selectedKey = Array.from(keys)[0];
    if (!selectedKey) return;
    onFrequencyChange(selectedKey as Frequency);
  };

  return (
    <Select
      label="Frequency"
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
    >
      <SelectItem key="monthly">Monthly</SelectItem>
      <SelectItem key="biMonthly">Bi-Monthly</SelectItem>
    </Select>
  );
};
