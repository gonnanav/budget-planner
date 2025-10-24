import { Select, SelectItem } from "@heroui/select";
import { Frequency } from "@/core/types";

interface FrequencyInputProps {
  frequency: Frequency;
  onChange: (frequency: Frequency) => void;
}

export const FrequencyInput = ({
  frequency,
  onChange,
}: FrequencyInputProps) => {
  return (
    <Select
      label="Frequency"
      selectedKeys={[frequency]}
      onSelectionChange={(keys) => {
        const selectedKey = Array.from(keys)[0];

        if (selectedKey === "monthly" || selectedKey === "biMonthly") {
          onChange(selectedKey);
        }
      }}
    >
      <SelectItem key="monthly">Monthly</SelectItem>
      <SelectItem key="biMonthly">Bi-Monthly</SelectItem>
    </Select>
  );
};
