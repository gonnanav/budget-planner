import {
  BalanceBanner,
  SectionTabs,
  AddButton,
  EditDrawer,
  CategoryEdit,
  ItemEdit,
  CategoryRow,
  ItemRow,
  EmptyList,
  SectionSummary,
} from "./components";
import type {
  CategoryInput,
  BudgetState,
  ItemInput,
  Section,
} from "core/types";
import { useEntityEdit, useActiveSection, useActiveEntity } from "./hooks";
import styles from "./BudgetScreen.module.css";

interface BudgetScreenProps {
  state: BudgetState;
  actions: {
    item: {
      onAdd: (input: ItemInput) => void;
      onUpdate: (id: string, input: ItemInput) => void;
      onDelete: (id: string, section: Section) => void;
    };
    category: {
      onAdd: (input: CategoryInput) => void;
      onUpdate: (id: string, input: CategoryInput) => void;
      onDelete: (id: string, section: Section) => void;
    };
  };
}

export function BudgetScreen({
  state: { income, expenses, balance },
  actions: { item, category },
}: BudgetScreenProps) {
  const { activeSection, toggleIncome, toggleExpenses } = useActiveSection();
  const { activeEntity, toggleEntity } = useActiveEntity();
  const edit = useEntityEdit();

  const { startCreateItem, startUpdateItem, updateItemDraft } = edit.actions;
  const { startCreateCategory, startUpdateCategory, updateCategoryDraft } = edit.actions;
  const { stopEdit } = edit.actions;

  const sectionState = activeSection === "expenses" ? expenses : income;
  const items = sectionState.items.data;
  const categories = sectionState.categories.data;

  const listItems = activeEntity === "item" ? items : categories;
  const showList = Boolean(listItems.length);
  const showEmptyList = !showList;
  const showItems = activeEntity === "item";
  const showCategories = !showItems;

  const isDrawerOpen = Boolean(edit.state);
  const itemDraft = (edit.state?.entity === "item") ? edit.state.draft : null;
  const categoryDraft = (edit.state?.entity === "category") ? edit.state.draft : null;

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

    const { onAdd, onUpdate } = edit.state.entity === "item" ? item : category;
    if (edit.state.mode === "create") {
      onAdd(edit.state.draft);
    } else if (edit.state.mode === "update" && edit.state.draft.id) {
      onUpdate(edit.state.draft.id, edit.state.draft);
    }

    stopEdit();
  };

  const handleDelete = () => {
    if (edit.state?.mode !== "update" || !edit.state.draft.id) return;

    const onDelete = edit.state.entity === "item" ? item.onDelete : category.onDelete;
    onDelete(edit.state.draft.id, edit.state.draft.section);

    stopEdit();
  };

  return (
    <div className={styles.root}>
      <div className={styles.overview}>
        <div className={styles.summaries}>
          <SectionSummary
            title="Income"
            amount={income.sum.data}
            variant="income"
            isActive={activeSection === "income"}
            onClick={toggleIncome}
          />
          <SectionSummary
            title="Expenses"
            amount={expenses.sum.data}
            variant="expense"
            isActive={activeSection === "expenses"}
            onClick={toggleExpenses}
          />
        </div>
        <BalanceBanner balance={balance.data} />
      </div>
      {activeSection && (
        <div className={styles.section}>
          <div className={styles.header}>
            <SectionTabs
              selectedTab={activeEntity}
              onTabChange={toggleEntity}
            />
            <AddButton entity={activeEntity} onClick={handleStartCreate} />
          </div>
          <div className={styles.content}>
            {showEmptyList && <EmptyList entity={activeEntity} />}
            {showList && (
              <ul>
                {showItems &&
                  items.map((item) => (
                    <ItemRow
                      key={item.id}
                      name={item.name}
                      amount={item.amount}
                      frequency={item.frequency}
                      normalizedAmount={item.normalizedAmount}
                      onClick={() => startUpdateItem(item)}
                    />
                  ))}
                {showCategories &&
                  categories.map((category) => (
                    <CategoryRow
                      key={category.id}
                      name={category.name}
                      amount={category.amount}
                      onClick={() => startUpdateCategory(category)}
                    />
                  ))}
              </ul>
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
