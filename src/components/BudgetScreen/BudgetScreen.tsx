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
import styles from "./BudgetScreen.module.css";

export interface BudgetScreenProps {
  state: BudgetState;
  actions: {
    item: {
      add: (section: Section, input: ItemInput) => Promise<string>;
      update: (
        section: Section,
        id: string,
        input: ItemInput,
      ) => Promise<boolean>;
      delete: (section: Section, id: string) => Promise<void>;
    };
    category: {
      add: (section: Section, input: CategoryInput) => Promise<string>;
      update: (
        section: Section,
        id: string,
        input: CategoryInput,
      ) => Promise<boolean>;
      delete: (section: Section, id: string) => Promise<void>;
    };
  };
}

export function BudgetScreen({
  state: { income, expenses, balance },
  actions,
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

  const isDrawerOpen = Boolean(edit.mode);
  const showItemEdit = edit.entity === "item";
  const itemDraft = edit.item.draft;
  const showCategoryEdit = edit.entity === "category";
  const categoryDraft = edit.category.draft;

  const handleAddClick = () => {
    if (!activeSection) return;

    if (activeEntity === "item") {
      edit.item.startCreate(activeSection);
    } else if (activeEntity === "category") {
      edit.category.startCreate(activeSection);
    }
  };

  const handleItemEdit = (item: Item) => {
    if (!activeSection) return;

    edit.item.startUpdate(activeSection, item);
  };

  const handleItemDraftChange = (draft: Partial<ItemDraft>) => {
    edit.item.updateDraft(draft);
  };

  const handleCategoryEdit = (category: Category) => {
    if (!activeSection) return;

    edit.category.startUpdate(activeSection, category);
  };

  const handleCategoryDraftChange = (draft: Partial<CategoryDraft>) => {
    edit.category.updateDraft(draft);
  };

  const handleCloseClick = () => {
    edit.clear();
  };

  const handleCancelClick = () => {
    edit.clear();
  };

  const handleSaveClick = () => {
    const section = edit.section;

    if (!section) {
      edit.clear();
      return;
    }

    if (edit.entity === "item" && edit.item.draft.id) {
      actions.item.update(section, edit.item.draft.id, edit.item.draft);
    } else if (edit.entity === "item") {
      actions.item.add(section, edit.item.draft);
    } else if (edit.entity === "category" && edit.category.draft.id) {
      actions.category.update(
        section,
        edit.category.draft.id,
        edit.category.draft,
      );
    } else if (edit.entity === "category") {
      actions.category.add(section, edit.category.draft);
    }

    edit.clear();
  };

  const handleDeleteClick = () => {
    const section = edit.section;

    if (!section) {
      edit.clear();
      return;
    }

    if (edit.entity === "item" && edit.item.draft.id) {
      actions.item.delete(section, edit.item.draft.id);
    } else if (edit.entity === "category" && edit.category.draft.id) {
      actions.category.delete(section, edit.category.draft.id);
    }

    edit.clear();
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
            mode={edit.mode}
            entity={edit.entity}
            section={edit.section}
            onClose={handleCloseClick}
            onCancel={handleCancelClick}
            onSave={handleSaveClick}
            onDelete={handleDeleteClick}
          >
            {showItemEdit && (
              <ItemEdit
                draft={itemDraft}
                categoryOptions={categories}
                onDraftChange={handleItemDraftChange}
              />
            )}
            {showCategoryEdit && (
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
