import { BalanceBanner } from "./BalanceBanner";
import { EditDrawer } from "./EditDrawer/EditDrawer";
import { ItemsView } from "./ItemsView/ItemsView";
import { SectionSummary } from "./SectionSummary";
import { useState } from "react";
import { useEdit } from "./useEdit";
import { useScrollToItem } from "./useScrollToItem";
import { useBudget, addItem, updateItem, deleteItem, updateCategory, deleteCategory } from "./budget.service";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Plus } from "lucide-react";
import type { Category, Item, Section, ItemInput, CategoryInput } from "./types";
import classes from "./BudgetScreen.module.css";

export function BudgetScreen() {
  const [selectedSection, setSelectedSection] = useState<Section>("expenses");
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);
  const budget = useBudget();
  const edit = useEdit();
  const viewportRef = useScrollToItem(budget, lastCreatedId);

  const categories = budget?.[selectedSection]?.categories ?? [];
  const categoryNames = categories.map((c) => c.name);
  const isBudgetEmpty = !budget || (budget.income.items.length === 0 && budget.expenses.items.length === 0);

  const handleSelectIncome = () => setSelectedSection("income");
  const handleSelectExpenses = () => setSelectedSection("expenses");

  const handleCreateItem = () => edit.startCreateItem(selectedSection);
  const handleUpdateIncomeItem = (item: Item) => edit.startUpdateItem("income", item);
  const handleUpdateExpenseItem = (item: Item) => edit.startUpdateItem("expenses", item);

  const handleSaveItem = (input: ItemInput) => {
    if (!edit.state) return;

    if (edit.state.mode === "create") {
      addItem(edit.state.section, input).then(setLastCreatedId);
    } else if (edit.state.entity === "item") {
      updateItem(edit.state.item.id, edit.state.section, input);
    }

    edit.stopEdit();
  };

  const handleDeleteItem = () => {
    if (edit.state?.mode !== "update" || edit.state.entity !== "item") return;

    const { name } = edit.state.item;
    deleteItem(edit.state.item.id, edit.state.section);
    edit.stopEdit();
    notifications.show({ message: `Deleted "${name}"` });
  };

  const handleUpdateIncomeCategory = (category: Category) => edit.startUpdateCategory("income", category);
  const handleUpdateExpenseCategory = (category: Category) => edit.startUpdateCategory("expenses", category);

  const handleSaveCategory = (input: CategoryInput) => {
    if (edit.state?.mode !== "update" || edit.state.entity !== "category") return;

    updateCategory(edit.state.name, edit.state.section, input);
    edit.stopEdit();
  };

  const handleDeleteCategory = () => {
    if (edit.state?.mode !== "update" || edit.state.entity !== "category") return;

    const { name } = edit.state;
    deleteCategory(name, edit.state.section);
    edit.stopEdit();
    notifications.show({ message: `Removed category "${name}"` });
  };

  return (
    <div className={classes.root}>
      <BalanceBanner
        balance={budget?.balance ?? { status: "balanced", delta: 0 }}
        empty={isBudgetEmpty}
      />
      <div className={classes.summaries}>
        <SectionSummary
          section="income"
          amount={budget?.income.total ?? 0}
          selected={selectedSection === "income"}
          onSelect={handleSelectIncome}
        />
        <SectionSummary
          section="expenses"
          amount={budget?.expenses.total ?? 0}
          selected={selectedSection === "expenses"}
          onSelect={handleSelectExpenses}
        />
      </div>
      {budget && (
        <div className={classes.viewport} ref={viewportRef}>
          <div className={classes.lists} data-section={selectedSection}>
            <div className={classes.list} inert={selectedSection !== "income"}>
              <ItemsView
                section="income"
                sectionState={budget.income}
                highlightedId={lastCreatedId}
                onItemClick={handleUpdateIncomeItem}
                onCategoryClick={handleUpdateIncomeCategory}
              />
            </div>
            <div className={classes.list} inert={selectedSection !== "expenses"}>
              <ItemsView
                section="expenses"
                sectionState={budget.expenses}
                highlightedId={lastCreatedId}
                onItemClick={handleUpdateExpenseItem}
                onCategoryClick={handleUpdateExpenseCategory}
              />
            </div>
          </div>
        </div>
      )}
      <Button
        className={classes.addItem}
        leftSection={<Plus size={16} />}
        onClick={handleCreateItem}
      >
        Add
      </Button>
      <EditDrawer
        editState={edit.state}
        categoryOptions={categoryNames}
        onClose={edit.stopEdit}
        onSaveItem={handleSaveItem}
        onDeleteItem={handleDeleteItem}
        onSaveCategory={handleSaveCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
}
