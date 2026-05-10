import { BalanceBanner } from "./BalanceBanner";
import { AddButton } from "./AddButton";
import { EditDrawer } from "./EditDrawer/EditDrawer";
import { ItemsView } from "./ItemsView/ItemsView";
import { SectionSummary } from "./SectionSummary";
import { useState } from "react";
import { useEntityEdit } from "./useEntityEdit";
import { useBudget } from "./useBudget";
import type { Category, Item, Section } from "@/domain/types";
import { addItem, updateItem, deleteItem, addCategory, updateCategory, deleteCategory } from "@/services/budget";
import classes from "./BudgetScreen.module.css";

export function BudgetScreen() {
  const budgetLoadable = useBudget();
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const toggleIncome = () =>
    setSelectedSection((prev) => (prev === "income" ? null : "income"));
  const toggleExpenses = () =>
    setSelectedSection((prev) => (prev === "expenses" ? null : "expenses"));

  const edit = useEntityEdit();

  const { startCreateItem, startUpdateItem, updateItemDraft } = edit.actions;
  const { startCreateCategory, startUpdateCategory, updateCategoryDraft, stopEdit } = edit.actions;

  const budget = budgetLoadable.status === "ready" ? budgetLoadable.data : null;
  const selectedState =
    budget && selectedSection
      ? selectedSection === "expenses"
        ? budget.expenses
        : budget.income
      : null;

  const handleStartCreateItem = () => {
    if (!selectedSection) return;
    startCreateItem(selectedSection);
  };

  const handleStartCreateCategory = () => {
    if (!selectedSection) return;
    startCreateCategory(selectedSection);
  };

  const handleItemClick = (item: Item) => {
    if (!selectedSection) return;
    startUpdateItem(selectedSection, item);
  };

  const handleCategoryClick = (category: Category) => {
    if (!selectedSection) return;
    startUpdateCategory(selectedSection, category);
  };

  const categories = selectedState?.categories ?? [];

  const handleSave = () => {
    if (!edit.state) return;

    if (edit.state.mode === "create") {
      if (edit.state.entity === "item") {
        addItem(edit.state.section, edit.state.draft);
      } else {
        addCategory(edit.state.section, edit.state.draft);
      }
    } else if (edit.state.mode === "update" && edit.state.draft.id) {
      if (edit.state.entity === "item") {
        updateItem(edit.state.draft.id, edit.state.section, edit.state.draft);
      } else {
        updateCategory(edit.state.draft.id, edit.state.section, edit.state.draft);
      }
    }

    stopEdit();
  };

  const handleDelete = () => {
    if (edit.state?.mode !== "update" || !edit.state.draft.id) return;

    if (edit.state.entity === "item") {
      deleteItem(edit.state.draft.id, edit.state.section);
    } else {
      deleteCategory(edit.state.draft.id, edit.state.section);
    }

    stopEdit();
  };

  return (
    <div className={classes.root}>
      <div className={classes.overview}>
        <div className={classes.summaries}>
          <SectionSummary
            section="income"
            amount={budget?.income.total ?? 0}
            selected={selectedSection === "income"}
            onSelect={toggleIncome}
          />
          <SectionSummary
            section="expenses"
            amount={budget?.expenses.total ?? 0}
            selected={selectedSection === "expenses"}
            onSelect={toggleExpenses}
          />
        </div>
        <BalanceBanner
          balance={budget?.balance ?? { status: "balanced", delta: 0 }}
        />
      </div>
      {selectedSection && selectedState && (
        <div className={classes.section}>
          <div className={classes.items}>
            <ItemsView
              sectionState={selectedState}
              onItemClick={handleItemClick}
              onCategoryClick={handleCategoryClick}
            />
          </div>
          <div className={classes.addButtons}>
            <AddButton onClick={handleStartCreateItem}>Add item</AddButton>
            <AddButton variant="secondary" onClick={handleStartCreateCategory}>Add category</AddButton>
          </div>
        </div>
      )}
      <EditDrawer
        editState={edit.state}
        categoryOptions={categories}
        onClose={stopEdit}
        onCancel={stopEdit}
        onSave={handleSave}
        onDelete={handleDelete}
        onItemDraftChange={updateItemDraft}
        onCategoryDraftChange={updateCategoryDraft}
      />
    </div>
  );
}
