import { Select } from "@mantine/core";
import type { Frequency } from "domain/types";

interface FrequencyInputProps {
  frequency: Frequency;
  onFrequencyChange: (frequency: Frequency) => void;
}

const data = [
  { value: "monthly", label: "Monthly" },
  { value: "biMonthly", label: "Bi-Monthly" },
];

export const FrequencyInput = ({
  frequency,
  onFrequencyChange,
}: FrequencyInputProps) => {
  const handleChange = (value: string | null) => {
    if (!value) return;
    onFrequencyChange(value as Frequency);
  };

  return (
    <Select
      label="Frequency"
      data={data}
      value={frequency}
      onChange={handleChange}
    />
  );
};
