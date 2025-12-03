import { SectionShell } from "./SectionShell";
import { ItemRow } from "@/components/item-row";
import { ItemDrawer } from "@/components/item-drawer";
import { useItemDraft } from "./useItemDraft";
import { useSectionItems } from "./useSectionItems";
import { ItemInput } from "@/core/types";
import { Item } from "@/core/types";

interface ItemsSectionProps {
  headingText: string;
  items: (Item & { normalizedAmount: number })[];
  categoryOptions: { id: string; name: string }[];
  addItem: (input: ItemInput) => Promise<string>;
  updateItem: (id: string, input: ItemInput) => Promise<boolean>;
  deleteItem: (id: string) => Promise<void>;
  onViewChange: (view: "items" | "categories") => void;
}

export function ItemsSection({
  headingText,
  items,
  categoryOptions,
  addItem,
  updateItem,
  deleteItem,
  onViewChange,
}: ItemsSectionProps) {
  const { itemDraft, updateItemDraft, resetItemDraft } = useItemDraft();

  const {
    isItemDrawerOpen,
    itemDrawerHeading,
    handleAddItemClick,
    handleItemClick,
    handleSaveItemClick,
    handleDeleteItemClick,
    handleCloseItemDrawer,
  } = useSectionItems({
    onAddItem: addItem,
    onUpdateItem: updateItem,
    onDeleteItem: deleteItem,
    onChangeItemInput: updateItemDraft,
    onResetItemInput: resetItemDraft,
  });

  return (
    <>
      <SectionShell
        headingText={headingText}
        addButtonLabel="Add item"
        selectedTab="items"
        items={items}
        emptyText="No items yet"
        onAddButtonClick={handleAddItemClick}
        onTabChange={onViewChange}
      >
        {(item) => (
          <ItemRow
            key={item.id}
            name={item.name}
            amount={item.amount}
            frequency={item.frequency}
            normalizedAmount={item.normalizedAmount}
            onClick={() => handleItemClick(item)}
          />
        )}
      </SectionShell>
      <ItemDrawer
        isOpen={isItemDrawerOpen}
        heading={itemDrawerHeading}
        categoryOptions={categoryOptions}
        draft={itemDraft}
        onDraftChange={updateItemDraft}
        onCancel={handleCloseItemDrawer}
        onSave={handleSaveItemClick}
        onClose={handleCloseItemDrawer}
        onDelete={handleDeleteItemClick}
      />
    </>
  );
}
