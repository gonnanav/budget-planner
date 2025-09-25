import { Select, SelectItem } from "@heroui/select";
import { BudgetEntryFrequency } from "./core/types";

interface FrequencyInputProps {
  frequency: BudgetEntryFrequency;
  onChange: (frequency: BudgetEntryFrequency) => void;
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
        const selectedKey = Array.from(keys)[0] as
          | BudgetEntryFrequency
          | undefined;

        if (selectedKey) {
          onChange(selectedKey);
        }
      }}
    >
      <SelectItem key="monthly">Monthly</SelectItem>
      <SelectItem key="biMonthly">Bi-Monthly</SelectItem>
    </Select>
  );
};
