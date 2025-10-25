import { useState, useContext } from "react";
import { ItemDrawerContext } from "@/contexts/ItemDrawerContext";
import { IncomeContext } from "@/contexts/IncomeContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { useBudgetItemDrawer } from "@/hooks/useBudgetItemDrawer";
import { BudgetItemInput } from "@/core/types";

interface ItemDrawerProviderProps {
  children: React.ReactNode;
}

export function ItemDrawerProvider({ children }: ItemDrawerProviderProps) {
  const [mode, setMode] = useState("income");
  const { incomes, addIncome, updateIncome, deleteIncome } =
    useContext(IncomeContext);
  const { incomeCategories } = useContext(IncomeCategoryContext);
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenseContext);
  const { expenseCategories } = useContext(ExpenseCategoryContext);

  const incomeProps = {
    items: incomes,
    onAdd: addIncome,
    onUpdate: updateIncome,
    onDelete: deleteIncome,
  };

  const expenseProps = {
    items: expenses,
    onAdd: addExpense,
    onUpdate: updateExpense,
    onDelete: deleteExpense,
  };

  const { isOpen, editedItem, onClose, onSave, onDelete, onOpen, onEditItem } =
    useBudgetItemDrawer(mode === "income" ? incomeProps : expenseProps);

  const categories = mode === "income" ? incomeCategories : expenseCategories;

  const handleOpen = (mode: "income" | "expense" = "income") => {
    setMode(mode);
    onOpen();
  };

  const handleEdit = (id: string, mode: "income" | "expense" = "income") => {
    setMode(mode);
    onEditItem(id);
  };

  const handleItemCancel = () => {
    onClose();
  };

  const handleItemSave = (input: BudgetItemInput) => {
    onSave(input);
    onClose();
  };

  const handleItemDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <ItemDrawerContext
      value={{
        isOpen,
        editedItem,
        categories,
        onClose,
        onOpen: handleOpen,
        onEditItem: handleEdit,
        onCancel: handleItemCancel,
        onSave: handleItemSave,
        onDelete: handleItemDelete,
      }}
    >
      {children}
    </ItemDrawerContext>
  );
}
