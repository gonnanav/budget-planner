import { OverviewScreen } from "components/overview";
import {
  AddButton,
  SectionLayout,
  SectionList,
  SectionTabs,
} from "components/section";
import { ItemRow } from "components/ItemRow";
import { CategoryRow } from "components/CategoryRow";
import { EditDrawer } from "components/EditDrawer";
import { ItemEdit } from "components/ItemDrawer";
import { CategoryEdit } from "components/CategoryDrawer";
import type { Category, Item } from "core/types";
import type { CategoryDraft, ItemDraft } from "components/shared/types";
import { calculateBalance } from "core/balance";
import { enrichItem } from "core/items";
import { enrichCategory } from "core/categories";
import { formatAmount } from "lib/format";
import styles from "./BudgetScreen.module.css";
import { useEdit } from "./useEdit";
import { useSection } from "./useSection";
import { useUnit } from "./useUnit";
import type { Section, Unit } from "core/types";

export interface BudgetScreenProps {
  income: {
    items: {
      data?: Item[];
      add: (draft: ItemDraft) => Promise<string>;
      update: (id: string, draft: ItemDraft) => Promise<boolean>;
      delete: (id: string) => Promise<void>;
    };
    categories: {
      data?: Category[];
      add: (name: string) => Promise<string>;
      update: (id: string, name: string) => Promise<boolean>;
      delete: (id: string) => Promise<void>;
    };
  };
  expenses: {
    items: {
      data?: Item[];
      add: (draft: ItemDraft) => Promise<string>;
      update: (id: string, draft: ItemDraft) => Promise<boolean>;
      delete: (id: string) => Promise<void>;
    };
    categories: {
      data?: Category[];
      add: (name: string) => Promise<string>;
      update: (id: string, name: string) => Promise<boolean>;
      delete: (id: string) => Promise<void>;
    };
  };
}

export function BudgetScreen({ income, expenses }: BudgetScreenProps) {
  const edit = useEdit();
  const sectionState = useSection(null);
  const unit = useUnit("item");
  const { value: section, toggleIncome, toggleExpenses } = sectionState;
  const activeUnit = unit.value;
  const incomeItems = income.items.data ?? [];
  const expenseItems = expenses.items.data ?? [];
  const incomeCategories = income.categories.data ?? [];
  const expenseCategories = expenses.categories.data ?? [];
  const incomeItemsData = incomeItems.map(enrichItem);
  const expenseItemsData = expenseItems.map(enrichItem);

  const incomeCategoriesData = incomeCategories.map((category) =>
    enrichCategory(category, incomeItems),
  );
  const expenseCategoriesData = expenseCategories.map((category) =>
    enrichCategory(category, expenseItems),
  );

  const incomeCategoryOptions = incomeCategories.map(({ id, name }) => ({
    id,
    name,
  }));
  const expenseCategoryOptions = expenseCategories.map(({ id, name }) => ({
    id,
    name,
  }));

  const isIncomeSection = section === "income";

  const { incomeSum, expenseSum, balance, status } = calculateBalance(
    incomeItems,
    expenseItems,
  );
  const formattedIncomeSum = formatAmount(incomeSum);
  const formattedExpenseSum = formatAmount(expenseSum);
  const formattedBalance = formatAmount(Math.abs(balance));

  const activeItems = section
    ? isIncomeSection
      ? incomeItemsData
      : expenseItemsData
    : [];
  const activeCategories = section
    ? isIncomeSection
      ? incomeCategoriesData
      : expenseCategoriesData
    : [];

  const addButtonLabel = activeUnit === "item" ? "Add Item" : "Add Category";
  const emptyText =
    activeUnit === "item" ? "No items yet." : "No categories yet.";

  const isDrawerOpen = Boolean(edit.mode);
  const modeText = edit.mode === "create" ? "Add" : "Edit";
  const sectionText = section === "income" ? "Income" : "Expenses";
  const unitText = edit.unit === "item" ? "Item" : "Category";
  const drawerHeadingText = `${modeText} ${sectionText} ${unitText}`;
  const showDeleteButton = edit.mode === "update";

  const showItemEdit = edit.unit === "item";
  const itemDraft = edit.item.draft;

  const showCategoryEdit = edit.unit === "category";
  const categoryOptions =
    edit.section === "income" ? incomeCategoryOptions : expenseCategoryOptions;
  const categoryDraft = edit.category.draft;

  const handleUnitChange = (nextUnit: Unit) => {
    if (nextUnit === "item") {
      unit.selectItems();
    } else {
      unit.selectCategories();
    }
  };

  const handleAdd = (
    section: Section,
    unit: Unit,
    value: ItemDraft | string,
  ) => {
    if (section === "income" && unit === "item") {
      income.items.add(value as ItemDraft);
    } else if (section === "income" && unit === "category") {
      income.categories.add(value as string);
    } else if (section === "expenses" && unit === "item") {
      expenses.items.add(value as ItemDraft);
    } else if (section === "expenses" && unit === "category") {
      expenses.categories.add(value as string);
    }
  };

  const handleUpdate = (
    section: Section,
    unit: Unit,
    id: string,
    value: ItemDraft | string,
  ) => {
    if (section === "income" && unit === "item") {
      income.items.update(id, value as ItemDraft);
    } else if (section === "income" && unit === "category") {
      income.categories.update(id, value as string);
    } else if (section === "expenses" && unit === "item") {
      expenses.items.update(id, value as ItemDraft);
    } else if (section === "expenses" && unit === "category") {
      expenses.categories.update(id, value as string);
    }
  };

  const handleDelete = (section: Section, unit: Unit, id: string) => {
    if (section === "income" && unit === "item") {
      income.items.delete(id);
    } else if (section === "income" && unit === "category") {
      income.categories.delete(id);
    } else if (section === "expenses" && unit === "item") {
      expenses.items.delete(id);
    } else if (section === "expenses" && unit === "category") {
      expenses.categories.delete(id);
    }
  };

  const handleAddClick = () => {
    if (!section) return;

    if (activeUnit === "item") {
      edit.item.startCreate(section);
    } else if (activeUnit === "category") {
      edit.category.startCreate(section);
    }
  };

  const handleItemEdit = (item: Item) => {
    if (!section) return;
    edit.item.startUpdate(section, item);
  };

  const handleItemDraftChange = (draft: Partial<ItemDraft>) => {
    edit.item.updateDraft(draft);
  };

  const handleCategoryEdit = (category: Category) => {
    if (!section) return;
    edit.category.startUpdate(section, category);
  };

  const handleCategoryDraftChange = (draft: Partial<CategoryDraft>) => {
    edit.category.updateDraft(draft);
  };

  const handleDrawerClose = () => {
    edit.clear();
  };

  const handleDrawerCancel = () => {
    edit.clear();
  };

  const itemRowClickHandlers = activeItems.reduce(
    (handlers, item) => {
      handlers[item.id] = () => handleItemEdit(item);
      return handlers;
    },
    {} as Record<string, () => void>,
  );

  const categoryRowClickHandlers = activeCategories.reduce(
    (handlers, category) => {
      handlers[category.id] = () => handleCategoryEdit(category);
      return handlers;
    },
    {} as Record<string, () => void>,
  );

  const handleDrawerSave = () => {
    if (!edit.mode || !edit.section || !edit.unit) return;

    if (edit.mode === "create") {
      handleAdd(edit.section, edit.unit, edit.item.draft);
    } else if (edit.mode === "update" && edit.item.draft.id) {
      handleUpdate(
        edit.section,
        edit.unit,
        edit.item.draft.id,
        edit.item.draft,
      );
    }
  };

  const handleDrawerDelete = () => {
    if (!edit.mode || !edit.section || !edit.unit || !edit.item.draft.id)
      return;

    handleDelete(edit.section, edit.unit, edit.item.draft.id);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <OverviewScreen
          incomeSum={formattedIncomeSum}
          expenseSum={formattedExpenseSum}
          balance={{ amount: formattedBalance, status }}
          activeSection={section}
          onIncomeClick={toggleIncome}
          onExpensesClick={toggleExpenses}
        />
      </div>
      {section && (
        <div className={styles.section}>
          <SectionLayout
            addButton={
              <AddButton label={addButtonLabel} onClick={handleAddClick} />
            }
            tabs={
              <SectionTabs
                selectedTab={activeUnit}
                onTabChange={handleUnitChange}
              />
            }
          >
            {activeUnit === "item" ? (
              <SectionList items={activeItems} emptyText={emptyText}>
                {(item) => (
                  <ItemRow
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    frequency={item.frequency}
                    normalizedAmount={item.normalizedAmount}
                    onClick={itemRowClickHandlers[item.id]}
                  />
                )}
              </SectionList>
            ) : (
              <SectionList items={activeCategories} emptyText={emptyText}>
                {(category) => (
                  <CategoryRow
                    key={category.id}
                    name={category.name}
                    amount={category.amount}
                    onClick={categoryRowClickHandlers[category.id]}
                  />
                )}
              </SectionList>
            )}
          </SectionLayout>
          <EditDrawer
            isOpen={isDrawerOpen}
            headingText={drawerHeadingText}
            hasDelete={showDeleteButton}
            onClose={handleDrawerClose}
            onCancel={handleDrawerCancel}
            onSave={handleDrawerSave}
            onDelete={handleDrawerDelete}
          >
            {showItemEdit && (
              <ItemEdit
                draft={itemDraft}
                categoryOptions={categoryOptions}
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
