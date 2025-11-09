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

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const { itemDrawerProps, onOpenItemDrawer, onCloseItemDrawer } =
    useItemDrawer();
  const { categoryDrawerProps, onOpenCategoryDrawer, onCloseCategoryDrawer } =
    useCategoryDrawer();

  const drawersHandlers = {
    onOpenItemDrawer,
    onCloseItemDrawer,
    onOpenCategoryDrawer,
    onCloseCategoryDrawer,
  };

  const {
    incomes,
    incomeCategories,
    onClickAddIncomeItem,
    onClickIncomeItem,
    onClickAddIncomeCategory,
    onClickIncomeCategory,
  } = useIncomes(drawersHandlers);

  const {
    expenses,
    expenseCategories,
    onClickAddExpenseItem,
    onClickExpenseItem,
    onClickAddExpenseCategory,
    onClickExpenseCategory,
  } = useExpenses(drawersHandlers);

  const pathname = usePathname();

  return (
    <Providers
      incomes={{
        items: incomes,
        categories: incomeCategories,
        onClickAddIncomeItem,
        onClickIncomeItem,
        onClickAddIncomeCategory,
        onClickIncomeCategory,
      }}
      expenses={{
        items: expenses,
        categories: expenseCategories,
        onClickAddExpenseItem,
        onClickExpenseItem,
        onClickAddExpenseCategory,
        onClickExpenseCategory,
      }}
    >
      <AppLayout
        selectedTab={pathname}
        onBackup={backupData}
        onRestore={restoreBackupToDb}
      >
        {children}
      </AppLayout>
      <ItemDrawer {...itemDrawerProps} />
      <CategoryDrawer {...categoryDrawerProps} />
    </Providers>
  );
}
