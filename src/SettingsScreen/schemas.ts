import { z } from "zod";

export const BackupItemSchema = z.object({
  name: z.string(),
  amount: z.number().nullable(),
  frequency: z.enum(["monthly", "biMonthly"]),
  category: z.string(),
  notes: z.string(),
});

export const BackupSettingsSchema = z.object({
  currency: z.string(),
});

export const BackupBudgetSchema = z.object({
  income: z.array(BackupItemSchema),
  expenses: z.array(BackupItemSchema),
  settings: BackupSettingsSchema,
});

export const BackupDataSchema = z.object({
  metadata: z.object({
    version: z.number(),
    exportedAt: z.string(),
  }),
  data: BackupBudgetSchema,
});
