import { z } from "zod";

const BackupItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number().nullable(),
  frequency: z.enum(["monthly", "biMonthly"]),
  category: z.string(),
  notes: z.string(),
});

const BackupBudgetSchema = z.object({
  income: z.array(BackupItemSchema),
  expenses: z.array(BackupItemSchema),
});

export const BackupDataSchema = z.object({
  metadata: z.object({
    version: z.number(),
    exportedAt: z.string(),
  }),
  data: BackupBudgetSchema,
});

export type BackupItem = z.infer<typeof BackupItemSchema>;
export type BackupBudget = z.infer<typeof BackupBudgetSchema>;
export type BackupData = z.infer<typeof BackupDataSchema>;
