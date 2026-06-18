import { createContext, useContext } from "react";
import { db } from "@/db";

export const DEFAULT_CURRENCY = "USD";
export const supportedCurrencies = Intl.supportedValuesOf("currency");
export const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function useCurrency(): CurrencyContextValue {
  const currency = useContext(CurrencyContext);
  
  if (currency === null) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }

  return currency;
}

export function createCurrency(currency: string): CurrencyContextValue {
  const wholeFormatter = createFormatter(currency, 0);
  const fractionalFormatter = createFormatter(currency, 2);

  return {
    currency,
    format: createFormat(wholeFormatter, fractionalFormatter),
    affixes: createAffixes(wholeFormatter),
  };
}

export async function getCurrency(): Promise<string> {
  const setting = await db.settings.get("currency");
  if (setting && supportedCurrencies.includes(setting.value)) return setting.value;

  return DEFAULT_CURRENCY;
}

export async function saveCurrency(currency: string): Promise<void> {
  await db.settings.put({ key: "currency", value: currency });
}

type CurrencyContextValue = {
  currency: string;
  format: (amount: number) => string;
  affixes: CurrencyAffixes;
};

type CurrencyAffixes = {
  prefix: string;
  suffix: string;
};

function createFormat(
  wholeFormatter: Intl.NumberFormat,
  fractionalFormatter: Intl.NumberFormat,
): (amount: number) => string {
  return (amount) => {
    const formatter = Number.isInteger(amount) ? wholeFormatter : fractionalFormatter;

    return formatter.format(amount);
  };
}

function createAffixes(formatter: Intl.NumberFormat): CurrencyAffixes {
  const parts = formatter.formatToParts(0);
  const integerIndex = parts.findIndex((part) => part.type === "integer");
  const prefix = parts.slice(0, integerIndex).map((part) => part.value).join("");
  const suffix = parts.slice(integerIndex + 1).map((part) => part.value).join("");

  return { prefix, suffix };
}

function createFormatter(currency: string, fractionDigits: number): Intl.NumberFormat {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}
