import { BalanceBanner } from "./components/BalanceBanner/BalanceBanner";
import { AddButton } from "./components/AddButton";
import { EditDrawer } from "./components/EditDrawer/EditDrawer";
import { CategoryEdit } from "./components/CategoryEdit/CategoryEdit";
import { ItemEdit } from "./components/ItemEdit/ItemEdit";
import { ItemList } from "./components/ItemList/ItemList";
import { SectionSummary } from "./components/SectionSummary/SectionSummary";
import { useContext, useState } from "react";
import { useEntityEdit } from "./hooks/useEntityEdit";
import { useBudget } from "./hooks/useBudget";
import type { Section } from "@/domain/types";
import { BudgetServiceContext } from "@/contexts/BudgetServiceContext";
import classes from "./BudgetScreen.module.css";

export function BudgetScreen() {
  const budgetService = useContext(BudgetServiceContext);
  const budgetLoadable = useBudget();
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const toggleIncome = () =>
    setSelectedSection((prev) => (prev === "income" ? null : "income"));
  const toggleExpenses = () =>
    setSelectedSection((prev) => (prev === "expenses" ? null : "expenses"));

  const edit = useEntityEdit();

  const { startCreateItem, startUpdateItem, updateItemDraft } = edit.actions;
  const { startCreateCategory, startUpdateCategory, updateCategoryDraft } =
    edit.actions;
  const { stopEdit } = edit.actions;

  const budget = budgetLoadable.status === "ready" ? budgetLoadable.data : null;
  const selectedState =
    budget && selectedSection
      ? selectedSection === "expenses"
        ? budget.expenses
        : budget.income
      : null;
  const items = selectedState?.items ?? [];
  const categories = selectedState?.categories ?? [];
  const groups = selectedState?.groups ?? [];

  const isDrawerOpen = Boolean(edit.state);
  const itemDraft = edit.state?.entity === "item" ? edit.state.draft : null;
  const categoryDraft =
    edit.state?.entity === "category" ? edit.state.draft : null;

  const handleStartCreateItem = () => {
    if (!selectedSection) return;
    startCreateItem(selectedSection);
  };

  const handleStartCreateCategory = () => {
    if (!selectedSection) return;
    startCreateCategory(selectedSection);
  };

  const handleSave = () => {
    if (!edit.state) return;

    if (edit.state.mode === "create") {
      if (edit.state.entity === "item") {
        budgetService.addItem(edit.state.draft);
      } else {
        budgetService.addCategory(edit.state.draft);
      }
    } else if (edit.state.mode === "update" && edit.state.draft.id) {
      if (edit.state.entity === "item") {
        budgetService.updateItem(edit.state.draft.id, edit.state.draft);
      } else {
        budgetService.updateCategory(edit.state.draft.id, edit.state.draft);
      }
    }

    stopEdit();
  };

  const handleDelete = () => {
    if (edit.state?.mode !== "update" || !edit.state.draft.id) return;

    if (edit.state.entity === "item") {
      budgetService.deleteItem(edit.state.draft.id, edit.state.draft.section);
    } else {
      budgetService.deleteCategory(edit.state.draft.id, edit.state.draft.section);
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
      {selectedSection && (
        <div className={classes.section}>
          <div className={classes.itemList}>
            <ItemList
              items={items}
              groups={groups}
              onItemClick={startUpdateItem}
              onCategoryClick={startUpdateCategory}
            />
          </div>
          <div className={classes.addButtons}>
            <AddButton onClick={handleStartCreateItem}>Add item</AddButton>
            <AddButton variant="secondary" onClick={handleStartCreateCategory}>Add category</AddButton>
          </div>
        </div>
      )}
      <EditDrawer
        isOpen={isDrawerOpen}
        mode={edit.state?.mode ?? null}
        entity={edit.state?.entity ?? null}
        section={edit.state?.draft.section ?? null}
        onClose={stopEdit}
        onCancel={stopEdit}
        onSave={handleSave}
        onDelete={handleDelete}
      >
        {itemDraft && (
          <ItemEdit
            draft={itemDraft}
            categoryOptions={categories}
            onDraftChange={updateItemDraft}
          />
        )}
        {categoryDraft && (
          <CategoryEdit
            draft={categoryDraft}
            onDraftChange={updateCategoryDraft}
          />
        )}
      </EditDrawer>
    </div>
  );
}
