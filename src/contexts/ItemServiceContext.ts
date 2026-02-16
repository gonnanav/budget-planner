import { createContext } from "react";
import type { Item, ItemInput, Section } from "domain/types";

interface ItemService {
  getItems: (section: Section) => Promise<Item[]>;
  addItem: (input: ItemInput) => Promise<string>;
  updateItem: (id: string, input: ItemInput) => Promise<boolean>;
  deleteItem: (id: string, section: Section) => Promise<void>;
}

function notProvided(): never {
  throw new Error("ItemServiceContext not provided");
}

export const ItemServiceContext = createContext<ItemService>({
  getItems: notProvided,
  addItem: notProvided,
  updateItem: notProvided,
  deleteItem: notProvided,
});
