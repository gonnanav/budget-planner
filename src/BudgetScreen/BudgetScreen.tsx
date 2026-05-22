import { BalanceBanner } from "./BalanceBanner";
import { EditDrawer } from "./EditDrawer/EditDrawer";
import { ItemsView } from "./ItemsView/ItemsView";
import { SectionSummary } from "./SectionSummary";
import { useState } from "react";
import { useEdit } from "./useEdit";
import { useBudget, addItem, updateItem, deleteItem, updateCategory, deleteCategory } from "./budget.service";
import { Plus } from "lucide-react";
import type { Category, Item, Section } from "./types";
import classes from "./BudgetScreen.module.css";

export function BudgetScreen() {
  const budget = useBudget();
  const edit = useEdit();
  const [selectedSection, setSelectedSection] = useState<Section>("expenses");

  const categories = budget?.[selectedSection]?.categories ?? [];
  const categoryNames = categories.map((c) => c.name);
  const isBudgetEmpty = !budget || (budget.income.items.length === 0 && budget.expenses.items.length === 0);

  const selectIncome = () => setSelectedSection("income");
  const selectExpenses = () => setSelectedSection("expenses");

  const startCreateItem = () => edit.startCreateItem(selectedSection);
  const startUpdateIncomeItem = (item: Item) => edit.startUpdateItem("income", item);
  const startUpdateIncomeCategory = (category: Category) => edit.startUpdateCategory("income", category);
  const startUpdateExpensesItem = (item: Item) => edit.startUpdateItem("expenses", item);
  const startUpdateExpensesCategory = (category: Category) => edit.startUpdateCategory("expenses", category);

  const saveEntity = () => {
    if (!edit.state) return;

    if (edit.state.mode === "create") {
      addItem(edit.state.section, edit.state.draft);
    } else {
      if (edit.state.entity === "item") {
        updateItem(edit.state.id, edit.state.section, edit.state.draft);
      } else {
        updateCategory(edit.state.name, edit.state.section, edit.state.draft);
      }
    }

    edit.stopEdit();
  };

  const deleteEntity = () => {
    if (edit.state?.mode !== "update") return;

    if (edit.state.entity === "item") {
      deleteItem(edit.state.id, edit.state.section);
    } else {
      deleteCategory(edit.state.name, edit.state.section);
    }

    edit.stopEdit();
  };

  return (
    <div className={classes.root}>
      <div className={classes.overview}>
        <BalanceBanner
          balance={budget?.balance ?? { status: "balanced", delta: 0 }}
          empty={isBudgetEmpty}
        />
        <div className={classes.summaries}>
          <SectionSummary
            section="income"
            amount={budget?.income.total ?? 0}
            selected={selectedSection === "income"}
            onSelect={selectIncome}
          />
          <SectionSummary
            section="expenses"
            amount={budget?.expenses.total ?? 0}
            selected={selectedSection === "expenses"}
            onSelect={selectExpenses}
          />
        </div>
      </div>
      {budget && (
        <div className={classes.content}>
          <div className={classes.viewport}>
            <div className={classes.lists} data-section={selectedSection}>
              <div className={classes.list}>
                <ItemsView
                  section="income"
                  sectionState={budget.income}
                  onItemClick={startUpdateIncomeItem}
                  onCategoryClick={startUpdateIncomeCategory}
                />
              </div>
              <div className={classes.list}>
                <ItemsView
                  section="expenses"
                  sectionState={budget.expenses}
                  onItemClick={startUpdateExpensesItem}
                  onCategoryClick={startUpdateExpensesCategory}
                />
              </div>
            </div>
          </div>
          <button className={classes.addItem} onClick={startCreateItem}>
            <Plus size={16} />
            Add
          </button>
        </div>
      )}
      <EditDrawer
        editState={edit.state}
        categoryOptions={categoryNames}
        onClose={edit.stopEdit}
        onCancel={edit.stopEdit}
        onSave={saveEntity}
        onDelete={deleteEntity}
        onItemDraftChange={edit.updateItemDraft}
        onCategoryDraftChange={edit.updateCategoryDraft}
      />
    </div>
  );
}
