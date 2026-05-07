import {
  BalanceBanner,
  AddButton,
  EditDrawer,
  CategoryEdit,
  ItemEdit,
  ItemList,
  IncomeSummary,
  ExpenseSummary,
} from "./components";
import { useContext, useState } from "react";
import { useEntityEdit, useBudget } from "./hooks";
import type { EditState, Section } from "@/domain/types";
import { BudgetServiceContext } from "@/contexts/BudgetServiceContext";
import classes from "./BudgetScreen.module.css";

type BudgetScreenProps = {
  initialEditState?: EditState | null;
};

export function BudgetScreen({ initialEditState }: BudgetScreenProps = {}) {
  const budgetService = useContext(BudgetServiceContext);
  const budgetLoadable = useBudget();
  const [activeSection, setActiveSection] = useState<Section | null>(
    initialEditState?.draft.section ?? null,
  );
  const toggleIncome = () =>
    setActiveSection((prev) => (prev === "income" ? null : "income"));
  const toggleExpenses = () =>
    setActiveSection((prev) => (prev === "expenses" ? null : "expenses"));

  const edit = useEntityEdit(initialEditState);

  const { startCreateItem, startUpdateItem, updateItemDraft } = edit.actions;
  const { startCreateCategory, startUpdateCategory, updateCategoryDraft } =
    edit.actions;
  const { stopEdit } = edit.actions;

  const budget = budgetLoadable.status === "ready" ? budgetLoadable.data : null;
  const activeState =
    budget && activeSection
      ? activeSection === "expenses"
        ? budget.expenses
        : budget.income
      : null;
  const items = activeState?.items ?? [];
  const categories = activeState?.categories ?? [];
  const groups = activeState?.groups ?? [];

  const isDrawerOpen = Boolean(edit.state);
  const itemDraft = edit.state?.entity === "item" ? edit.state.draft : null;
  const categoryDraft =
    edit.state?.entity === "category" ? edit.state.draft : null;

  const handleStartCreateItem = () => {
    if (!activeSection) return;
    startCreateItem(activeSection);
  };

  const handleStartCreateCategory = () => {
    if (!activeSection) return;
    startCreateCategory(activeSection);
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
          <IncomeSummary
            amount={budget?.income.total ?? 0}
            isActive={activeSection === "income"}
            onClick={toggleIncome}
          />
          <ExpenseSummary
            amount={budget?.expenses.total ?? 0}
            isActive={activeSection === "expenses"}
            onClick={toggleExpenses}
          />
        </div>
        <BalanceBanner
          balance={budget?.balance ?? { status: "balanced", delta: 0 }}
        />
      </div>
      {activeSection && (
        <div className={classes.section}>
          <div className={classes.content}>
            <ItemList
              items={items}
              groups={groups}
              onItemClick={startUpdateItem}
              onCategoryClick={startUpdateCategory}
            />
          </div>
          <div className={classes.footer}>
            <AddButton onClick={handleStartCreateItem}>Add item</AddButton>
            <AddButton variant="secondary" onClick={handleStartCreateCategory}>Add category</AddButton>
          </div>
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
      )}
    </div>
  );
}
