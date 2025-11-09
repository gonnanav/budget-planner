"use client";

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
import { DataBackupRestoreContext } from "@/contexts/DataBackupRestoreContext";
import { backupData, restoreData } from "@/lib/backup-restore";

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
      <DataBackupRestoreContext value={{ backupData, restoreData }}>
        <AppLayout>{children}</AppLayout>
        <ItemDrawer {...itemDrawerProps} />
        <CategoryDrawer {...categoryDrawerProps} />
      </DataBackupRestoreContext>
    </Providers>
  );
}
