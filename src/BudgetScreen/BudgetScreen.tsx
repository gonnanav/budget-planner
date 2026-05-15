import { BalanceBanner } from "./BalanceBanner";
import { AddButton } from "./AddButton";
import { EditDrawer } from "./EditDrawer/EditDrawer";
import { ItemsView } from "./ItemsView/ItemsView";
import { SectionSummary } from "./SectionSummary";
import { useState } from "react";
import { useEntityEdit } from "./useEntityEdit";
import { useBudget, addItem, updateItem, deleteItem, addCategory, updateCategory, deleteCategory } from "./budget.service";
import type { Category, Item, Section } from "./types";
import classes from "./BudgetScreen.module.css";

export function BudgetScreen() {
  const budget = useBudget();
  const edit = useEntityEdit();
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const selectedState = budget && selectedSection ? budget[selectedSection] : null;
  const categories = selectedState?.categories ?? [];

  const toggleSection = (section: Section) =>
    setSelectedSection((prev) => (prev === section ? null : section));

  const toggleIncome = () => toggleSection("income");
  const toggleExpenses = () => toggleSection("expenses");

  const startCreateItem = () => {
    if (!selectedSection) return;
    edit.startCreateItem(selectedSection);
  };

  const startCreateCategory = () => {
    if (!selectedSection) return;
    edit.startCreateCategory(selectedSection);
  };

  const startUpdateItem = (item: Item) => {
    if (!selectedSection) return;
    edit.startUpdateItem(selectedSection, item);
  };

  const startUpdateCategory = (category: Category) => {
    if (!selectedSection) return;
    edit.startUpdateCategory(selectedSection, category);
  };

  const saveEntity = () => {
    if (!edit.state) return;

    if (edit.state.mode === "create") {
      if (edit.state.entity === "item") {
        addItem(edit.state.section, edit.state.draft);
      } else {
        addCategory(edit.state.section, edit.state.draft);
      }
    } else if (edit.state.mode === "update") {
      if (edit.state.entity === "item") {
        updateItem(edit.state.id, edit.state.section, edit.state.draft);
      } else {
        updateCategory(edit.state.id, edit.state.section, edit.state.draft);
      }
    }

    edit.stopEdit();
  };

  const deleteEntity = () => {
    if (edit.state?.mode !== "update") return;

    if (edit.state.entity === "item") {
      deleteItem(edit.state.id, edit.state.section);
    } else {
      deleteCategory(edit.state.id, edit.state.section);
    }

    edit.stopEdit();
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
      {selectedState && (
        <div className={classes.section}>
          <div className={classes.items}>
            <ItemsView
              sectionState={selectedState}
              onItemClick={startUpdateItem}
              onCategoryClick={startUpdateCategory}
            />
          </div>
          <div className={classes.addButtons}>
            <AddButton onClick={startCreateItem}>Add item</AddButton>
            <AddButton variant="secondary" onClick={startCreateCategory}>Add category</AddButton>
          </div>
        </div>
      )}
      <EditDrawer
        editState={edit.state}
        categoryOptions={categories}
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
