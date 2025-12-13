import { SectionShell } from "@/components/section/SectionShell";
import { ItemRow } from "@/components/item-row";
import { ItemDrawer } from "@/components/item-drawer";
import { Item, ItemInput } from "@/core/types";
import { ItemDraft } from "@/components/shared/types";

interface ItemsScreenProps {
  headingText: string;
  addButtonLabel: string;
  emptyItemsText: string;
  items: (Item & { normalizedAmount: number })[];
  categoryOptions: { id: string; name: string }[];
  isDrawerOpen: boolean;
  drawerHeadingText: string;
  draft: ItemDraft;
  onAddClick: () => void;
  onItemClick: (item: Item) => void;
  onDraftChange: (draft: Partial<ItemInput>) => void;
  onDrawerClose: () => void;
  onSaveClick: (draft: ItemDraft) => Promise<void>;
  onDeleteClick: (id?: string) => Promise<void>;
  onViewChange: (view: "items" | "categories") => void;
}

export function ItemsScreen({
  headingText,
  addButtonLabel,
  emptyItemsText,
  items,
  categoryOptions,
  isDrawerOpen,
  drawerHeadingText,
  draft,
  onItemClick,
  onAddClick,
  onDraftChange,
  onDrawerClose,
  onSaveClick,
  onDeleteClick,
  onViewChange,
}: ItemsScreenProps) {
  return (
    <>
      <SectionShell
        headingText={headingText}
        addButtonLabel={addButtonLabel}
        selectedTab="items"
        items={items}
        emptyItemsText={emptyItemsText}
        onAddClick={onAddClick}
        onTabChange={onViewChange}
      >
        {(item) => (
          <ItemRow
            key={item.id}
            name={item.name}
            amount={item.amount}
            frequency={item.frequency}
            normalizedAmount={item.normalizedAmount}
            onClick={() => onItemClick(item)}
          />
        )}
      </SectionShell>
      <ItemDrawer
        isOpen={isDrawerOpen}
        headingText={drawerHeadingText}
        categoryOptions={categoryOptions}
        draft={draft}
        onDraftChange={onDraftChange}
        onCancel={onDrawerClose}
        onSave={onSaveClick}
        onClose={onDrawerClose}
        onDelete={onDeleteClick}
      />
    </>
  );
}
