const formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "ILS",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
});

export function formatAmount(amount: number): string {
  return formatter.format(amount);
}
