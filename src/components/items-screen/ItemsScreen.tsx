import { SectionShell } from "@/components/section/SectionShell";
import { ItemRow } from "@/components/item-row";
import { ItemDrawer } from "@/components/item-drawer";
import { useItemDraft } from "./useItemDraft";
import { useSectionItems } from "./useSectionItems";
import { Item, ItemInput } from "@/core/types";

interface ItemsScreenProps {
  headingText: string;
  items: (Item & { normalizedAmount: number })[];
  categoryOptions: { id: string; name: string }[];
  addItem: (input: ItemInput) => Promise<string>;
  updateItem: (id: string, input: ItemInput) => Promise<boolean>;
  deleteItem: (id: string) => Promise<void>;
  onViewChange: (view: "items" | "categories") => void;
}

export function ItemsScreen({
  headingText,
  items,
  categoryOptions,
  addItem,
  updateItem,
  deleteItem,
  onViewChange,
}: ItemsScreenProps) {
  const { draft, updateDraft, resetDraft } = useItemDraft();

  const {
    isItemDrawerOpen,
    itemDrawerHeading,
    handleAddItemClick,
    handleItemClick,
    handleSaveItemClick,
    handleDeleteItemClick,
    handleCloseItemDrawer,
  } = useSectionItems({
    selectedItemId: draft.id,
    onAddItem: addItem,
    onUpdateItem: updateItem,
    onDeleteItem: deleteItem,
    onChangeItemInput: updateDraft,
    onResetItemInput: resetDraft,
  });

  return (
    <>
      <SectionShell
        headingText={headingText}
        addButtonLabel="Add item"
        selectedTab="items"
        items={items}
        emptyItemsText="No items yet"
        onAddClick={handleAddItemClick}
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
        draft={draft}
        onDraftChange={updateDraft}
        onCancel={handleCloseItemDrawer}
        onSave={handleSaveItemClick}
        onClose={handleCloseItemDrawer}
        onDelete={handleDeleteItemClick}
      />
    </>
  );
}
