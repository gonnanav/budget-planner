import { ItemAmount, Frequency } from "@/core/types";

export interface ItemDraft {
  id?: string;
  name: string;
  amount: ItemAmount;
  frequency: Frequency;
  categoryId?: string;
  notes?: string;
}

export interface CategoryDraft {
  id?: string;
  name: string;
}
