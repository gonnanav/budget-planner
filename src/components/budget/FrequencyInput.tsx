import { Select, SelectItem } from "@heroui/select";
import { BudgetEntryFrequency } from "./core/types";

interface FrequencyInputProps {
  label: string;
  frequency: BudgetEntryFrequency | null;
  onChange: (frequency: BudgetEntryFrequency | null) => void;
}

export const FrequencyInput = ({
  label,
  frequency,
  onChange,
}: FrequencyInputProps) => {
  return (
    <Select
      label={label}
      placeholder="Select frequency"
      selectedKeys={frequency ? [frequency] : []}
      onSelectionChange={(keys) => {
        const selectedKey = Array.from(keys)[0] as BudgetEntryFrequency | null;
        onChange(selectedKey);
      }}
    >
      <SelectItem key="monthly">Monthly</SelectItem>
      <SelectItem key="biMonthly">Bi-Monthly</SelectItem>
    </Select>
  );
};
