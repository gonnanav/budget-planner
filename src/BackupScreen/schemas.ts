import { z } from "zod";

const BackupItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number().nullable(),
  frequency: z.enum(["monthly", "biMonthly"]),
  categoryId: z.string().nullable(),
  notes: z.string(),
});

const BackupCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

const BackupSectionSchema = z.object({
  items: z.array(BackupItemSchema),
  categories: z.array(BackupCategorySchema),
});

const BackupBudgetSchema = z.object({
  income: BackupSectionSchema,
  expenses: BackupSectionSchema,
});

export const BackupDataSchema = z.object({
  metadata: z.object({
    version: z.number(),
    exportedAt: z.string(),
  }),
  data: BackupBudgetSchema,
});

export type BackupItem = z.infer<typeof BackupItemSchema>;
export type BackupCategory = z.infer<typeof BackupCategorySchema>;
export type BackupSection = z.infer<typeof BackupSectionSchema>;
export type BackupBudget = z.infer<typeof BackupBudgetSchema>;
export type BackupData = z.infer<typeof BackupDataSchema>;
