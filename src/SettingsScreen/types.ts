import type { z } from "zod";
import type { DbItem, DbSetting } from "@/db";
import type {
  BackupBudgetSchema,
  BackupDataSchema,
  BackupItemSchema,
  BackupSettingsSchema,
} from "./schemas";

export type DbBudget = {
  income: DbItem[];
  expenses: DbItem[];
  settings: DbSetting[];
};

export type BackupItem = z.infer<typeof BackupItemSchema>;
export type BackupSettings = z.infer<typeof BackupSettingsSchema>;
export type BackupBudget = z.infer<typeof BackupBudgetSchema>;
export type BackupData = z.infer<typeof BackupDataSchema>;
