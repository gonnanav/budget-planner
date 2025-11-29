export function formatItemDisplay({
  amount,
  frequency,
  normalizedAmount,
}: {
  amount: number | null;
  frequency: string;
  normalizedAmount: number;
}) {
  return {
    formattedAmount: amount ? `₪${amount.toLocaleString()}` : null,
    frequencyText: frequency === "monthly" ? "Monthly" : "Bi-monthly",
    formattedNormalizedAmount: `₪${normalizedAmount.toLocaleString()}/month`,
    showNormalizedAmount: frequency === "biMonthly",
  };
}
