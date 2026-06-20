import { ItemList } from "./ItemList";
import { useCurrency } from "@/currency";
import type { Item, Category, Section, SectionState } from "../types";
import classes from "./ItemsView.module.css";

type ItemsViewProps = {
  section: Section;
  sectionState: SectionState;
  highlightedId: string | null;
  onItemClick: (item: Item) => void;
  onCategoryClick: (category: Category) => void;
};

const emptyMessages: Record<Section, string> = {
  income: "No income yet — add your first one below.",
  expenses: "No expenses yet — add your first one below.",
};

export function ItemsView({ section, sectionState, highlightedId, onItemClick, onCategoryClick }: ItemsViewProps) {
  const { format } = useCurrency();
  const { items, categories, uncategorized } = sectionState;

  const formatMonthlyTotal = (total: number) => `${format(total)}/month`;

  if (items.length === 0) {
    return <p className={classes.empty}>{emptyMessages[section]}</p>;
  }

  if (categories.length === 0) {
    return <ItemList items={items} highlightedId={highlightedId} onItemClick={onItemClick} />;
  }

  return (
    <div>
      {categories.map((category) => (
        <div key={category.name} className={classes.group}>
          <button className={classes.header} onClick={() => onCategoryClick(category)}>
            <span className={classes.name}>{category.name}</span>
            <span className={classes.total}>{formatMonthlyTotal(category.total)}</span>
          </button>
          {category.items.length > 0 && (
            <ItemList items={category.items} highlightedId={highlightedId} onItemClick={onItemClick} />
          )}
        </div>
      ))}
      {uncategorized.items.length > 0 && (
        <div className={classes.group}>
          <div className={classes.header}>
            <span className={classes.name}>Uncategorized</span>
            <span className={classes.total}>{formatMonthlyTotal(uncategorized.total)}</span>
          </div>
          <ItemList items={uncategorized.items} highlightedId={highlightedId} onItemClick={onItemClick} />
        </div>
      )}
    </div>
  );
}
