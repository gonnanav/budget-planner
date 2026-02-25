import {
  BalanceBanner,
  SectionTabs,
  AddButton,
  EditDrawer,
  CategoryEdit,
  ItemEdit,
  CategoryList,
  ItemList,
  IncomeSummary,
  ExpenseSummary,
} from "./components";
import { useContext } from "react";
import { useEntityEdit, useActiveSection, useActiveEntity, useBudget } from "./hooks";
import type { EditState } from "domain/types";
import { BudgetServiceContext } from "contexts/BudgetServiceContext";
import classes from "./BudgetScreen.module.css";

type BudgetScreenProps = {
  initialEditState?: EditState | null;
};

export function BudgetScreen({ initialEditState }: BudgetScreenProps = {}) {
  const budgetService = useContext(BudgetServiceContext);
  const budgetLoadable = useBudget();
  const { activeSection, toggleIncome, toggleExpenses } = useActiveSection(
    initialEditState?.draft.section ?? null,
  );
  const { activeEntity, toggleEntity } = useActiveEntity(
    initialEditState?.entity ?? "item",
  );
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

  const showItems = activeEntity === "item";
  const showCategories = !showItems;

  const isDrawerOpen = Boolean(edit.state);
  const itemDraft = edit.state?.entity === "item" ? edit.state.draft : null;
  const categoryDraft =
    edit.state?.entity === "category" ? edit.state.draft : null;

  const handleStartCreate = () => {
    if (!activeSection) return;

    if (activeEntity === "item") {
      startCreateItem(activeSection);
    } else if (activeEntity === "category") {
      startCreateCategory(activeSection);
    }
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
            amount={budget?.income.sum ?? 0}
            isActive={activeSection === "income"}
            onClick={toggleIncome}
          />
          <ExpenseSummary
            amount={budget?.expenses.sum ?? 0}
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
          <div className={classes.header}>
            <SectionTabs
              selectedTab={activeEntity}
              onTabChange={toggleEntity}
            />
            <AddButton entity={activeEntity} onClick={handleStartCreate} />
          </div>
          <div className={classes.content}>
            {showItems && (
              <ItemList items={items} onItemClick={startUpdateItem} />
            )}
            {showCategories && (
              <CategoryList
                categories={categories}
                onCategoryClick={startUpdateCategory}
              />
            )}
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
                categoryOptions={categories.map((s) => s.category)}
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
