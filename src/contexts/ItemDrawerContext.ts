import { createContext } from "react";

interface ItemDrawerContextValue {
  onEditItem: (id: string, mode: "income" | "expense") => void;
  onOpen: (mode: "income" | "expense") => void;
}

export const ItemDrawerContext = createContext<ItemDrawerContextValue>({
  onOpen: () => {},
  onEditItem: () => {},
});
