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
import type {
  CategoryInput,
  Budget,
  ItemInput,
  Section,
} from "core/types";
import { useEntityEdit, useActiveSection, useActiveEntity } from "./hooks";
import styles from "./BudgetScreen.module.css";

interface BudgetScreenProps {
  budget: Budget;
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
  budget: { income, expenses, balance },
  actions: { item, category },
}: BudgetScreenProps) {
  const { activeSection, toggleIncome, toggleExpenses } = useActiveSection();
  const { activeEntity, toggleEntity } = useActiveEntity();
  const edit = useEntityEdit();

  const { startCreateItem, startUpdateItem, updateItemDraft } = edit.actions;
  const { startCreateCategory, startUpdateCategory, updateCategoryDraft } =
    edit.actions;
  const { stopEdit } = edit.actions;

  const activeSectionLoadable =
    activeSection === "expenses" ? expenses : income;
  const items =
    activeSectionLoadable.status === "ready"
      ? activeSectionLoadable.data.items
      : [];
  const categories =
    activeSectionLoadable.status === "ready"
      ? activeSectionLoadable.data.categories
      : [];

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

    const onDelete =
      edit.state.entity === "item" ? item.onDelete : category.onDelete;
    onDelete(edit.state.draft.id, edit.state.draft.section);

    stopEdit();
  };

  return (
    <div className={styles.root}>
      <div className={styles.overview}>
        <div className={styles.summaries}>
          <IncomeSummary
            amount={income.status === "ready" ? income.data.sum : 0}
            isActive={activeSection === "income"}
            onClick={toggleIncome}
          />
          <ExpenseSummary
            amount={expenses.status === "ready" ? expenses.data.sum : 0}
            isActive={activeSection === "expenses"}
            onClick={toggleExpenses}
          />
        </div>
        <BalanceBanner
          balance={
            balance.status === "ready"
              ? balance.data
              : { status: "balanced", delta: 0 }
          }
        />
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
