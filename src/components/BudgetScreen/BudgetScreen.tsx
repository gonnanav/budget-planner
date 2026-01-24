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
  Category,
  CategoryInput,
  CategoryDraft,
  BudgetState,
  Item,
  ItemInput,
  ItemDraft,
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

  const handleAddClick = () => {
    if (!activeSection) return;

    if (activeEntity === "item") {
      edit.actions.startCreateItem(activeSection);
    } else if (activeEntity === "category") {
      edit.actions.startCreateCategory(activeSection);
    }
  };

  const handleItemEdit = (item: Item) => {
    if (!activeSection) return;

    edit.actions.startUpdateItem({ ...item, section: activeSection });
  };

  const handleItemDraftChange = (draft: Partial<ItemDraft>) => {
    edit.actions.updateDraft(draft);
  };

  const handleCategoryEdit = (category: Category) => {
    if (!activeSection) return;

    edit.actions.startUpdateCategory({ ...category, section: activeSection });
  };

  const handleCategoryDraftChange = (draft: Partial<CategoryDraft>) => {
    edit.actions.updateDraft(draft);
  };

  const handleCloseClick = () => {
    edit.actions.clear();
  };

  const handleCancelClick = () => {
    edit.actions.clear();
  };

  const handleSaveClick = () => {
    if (!edit.state) return;

    if (edit.state.entity === "item") {
      if (edit.state.draft.id) {
        item.onUpdate(edit.state.draft.id, edit.state.draft);
      } else {
        item.onAdd(edit.state.draft);
      }
    } else if (edit.state.entity === "category") {
      if (edit.state.draft.id) {
        category.onUpdate(edit.state.draft.id, edit.state.draft);
      } else {
        category.onAdd(edit.state.draft);
      }
    }

    edit.actions.clear();
  };

  const handleDeleteClick = () => {
    if (!edit.state) return;

    const section = edit.state.draft.section;

    if (edit.state.entity === "item" && edit.state.draft.id) {
      item.onDelete(edit.state.draft.id, section);
    } else if (edit.state.entity === "category" && edit.state.draft.id) {
      category.onDelete(edit.state.draft.id, section);
    }

    edit.actions.clear();
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
            <AddButton entity={activeEntity} onClick={handleAddClick} />
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
                      onClick={() => handleItemEdit(item)}
                    />
                  ))}
                {showCategories &&
                  categories.map((category) => (
                    <CategoryRow
                      key={category.id}
                      name={category.name}
                      amount={category.amount}
                      onClick={() => handleCategoryEdit(category)}
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
            onClose={handleCloseClick}
            onCancel={handleCancelClick}
            onSave={handleSaveClick}
            onDelete={handleDeleteClick}
          >
            {itemDraft && (
              <ItemEdit
                draft={itemDraft}
                categoryOptions={categories}
                onDraftChange={handleItemDraftChange}
              />
            )}
            {categoryDraft && (
              <CategoryEdit
                draft={categoryDraft}
                onDraftChange={handleCategoryDraftChange}
              />
            )}
          </EditDrawer>
        </div>
      )}
    </div>
  );
}
