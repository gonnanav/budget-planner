import { ItemAmount, Frequency } from "@/core/types";

export interface ItemDraft {
  name: string;
  amount: ItemAmount;
  frequency: Frequency;
  categoryId?: string;
  notes?: string;
}
