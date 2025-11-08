import { createContext } from "react";

export interface AppActionsContextValue {
  onClickAddIncomeItem: () => void;
  onClickAddExpenseItem: () => void;
  onClickIncomeItem: (id: string) => void;
  onClickExpenseItem: (id: string) => void;
  onClickAddIncomeCategory: () => void;
  onClickAddExpenseCategory: () => void;
  onClickIncomeCategory: (id: string) => void;
  onClickExpenseCategory: (id: string) => void;
}

export const AppActionsContext = createContext<AppActionsContextValue>({
  onClickAddIncomeItem: () => {},
  onClickAddExpenseItem: () => {},
  onClickIncomeItem: () => {},
  onClickExpenseItem: () => {},
  onClickAddIncomeCategory: () => {},
  onClickAddExpenseCategory: () => {},
  onClickIncomeCategory: () => {},
  onClickExpenseCategory: () => {},
});
