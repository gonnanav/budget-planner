import { type ReactNode, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { CurrencyContext, createCurrency, DEFAULT_CURRENCY, getCurrency } from "./currency";

type CurrencyProviderProps = {
  children: ReactNode;
};

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const code = useLiveQuery(getCurrency) ?? DEFAULT_CURRENCY;
  const currency = useMemo(() => createCurrency(code), [code]);

  return (
    <CurrencyContext value={currency}>
      {children}
    </CurrencyContext>
  );
}
