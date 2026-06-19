import { Select } from "@mantine/core";
import { saveCurrency, supportedCurrencies, useCurrency } from "@/currency";
import { SettingsCard } from "./SettingsCard/SettingsCard";

const displayNames = new Intl.DisplayNames(undefined, { type: "currency" });
const currencyOptions = supportedCurrencies.map((code) => {
  const name = displayNames.of(code);

  return {
    value: code,
    label: name && name !== code ? `${code} — ${name}` : code,
  };
});

type CurrencySectionProps = {
  className?: string;
};

export function CurrencySection({ className }: CurrencySectionProps) {
  const { currency } = useCurrency();

  const handleChange = (value: string | null) => {
    if (value) saveCurrency(value);
  };

  return (
    <SettingsCard
      className={className}
      title="Currency"
      description="The currency symbol used across the app. Changing it relabels existing amounts — it doesn't convert them."
    >
      <Select
        aria-label="Currency"
        data={currencyOptions}
        value={currency}
        onChange={handleChange}
        searchable
        allowDeselect={false}
        nothingFoundMessage="No matching currency"
      />
    </SettingsCard>
  );
}
