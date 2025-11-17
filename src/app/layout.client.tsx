"use client";

import { usePathname } from "next/navigation";
import { AppLayout } from "@/components/app-layout";
import { ItemDrawer } from "@/components/item-drawer";
import {
  CategoryDrawer,
  useCategoryDrawer,
} from "@/components/category-drawer";
import { useItemDrawer } from "@/components/item-drawer";
import { Providers } from "@/providers";
import { useIncomes } from "@/hooks/useIncomes";
import { useExpenses } from "@/hooks/useExpenses";
import { backupData, restoreBackupToDb } from "@/lib/backup-restore";
import { useTableItems } from "@/db";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const { items: incomes } = useTableItems("incomes");
  const { items: expenses } = useTableItems("expenses");
  const pathname = usePathname();

  return (
    <Providers incomes={{ items: incomes }} expenses={{ items: expenses }}>
      <AppLayout
        selectedTab={pathname}
        onBackup={backupData}
        onRestore={restoreBackupToDb}
      >
        {children}
      </AppLayout>
    </Providers>
  );
}
