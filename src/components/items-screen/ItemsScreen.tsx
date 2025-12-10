import { SectionShell } from "@/components/section/SectionShell";
import { ItemRow } from "@/components/item-row";
import { ItemDrawer } from "@/components/item-drawer";
import { useItemDraft } from "./useItemDraft";
import { Item, ItemInput } from "@/core/types";
import { useDisclosure } from "@heroui/react";
import { ItemDraft } from "@/components/shared/types";

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
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const handleAddClick = () => {
    resetDraft();
    openDrawer();
  };

  const handleItemClick = (item: Item) => {
    updateDraft(item);
    openDrawer();
  };

  const handleSaveClick = async (draft: ItemDraft) => {
    if (draft.id) {
      await updateItem(draft.id, draft);
    } else {
      await addItem(draft);
    }

    closeDrawer();
  };

  const handleDeleteClick = async (id?: string) => {
    if (!id) return;

    await deleteItem(id);
    closeDrawer();
  };

  const drawerHeadingText = draft.id ? "Edit Item" : "Add Item";

  return (
    <>
      <SectionShell
        headingText={headingText}
        addButtonLabel="Add item"
        selectedTab="items"
        items={items}
        emptyItemsText="No items yet"
        onAddClick={handleAddClick}
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
        isOpen={isDrawerOpen}
        headingText={drawerHeadingText}
        categoryOptions={categoryOptions}
        draft={draft}
        onDraftChange={updateDraft}
        onCancel={closeDrawer}
        onSave={handleSaveClick}
        onClose={closeDrawer}
        onDelete={handleDeleteClick}
      />
    </>
  );
}
