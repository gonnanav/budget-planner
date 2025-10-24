import { ItemListItem } from "@/components/item-list-item";
import { SectionContent } from "@/components/shared";

interface ItemsContentProps {
  items: {
    id: string;
    name: string;
    amount: number | null;
    frequency: string;
    normalizedAmount: number;
  }[];
  onClickItem: (id: string) => void;
}

export function ItemsContent({ items, onClickItem }: ItemsContentProps) {
  return (
    <SectionContent items={items} emptyStateText="No items yet">
      {({ id, name, amount, frequency, normalizedAmount }) => (
        <ItemListItem
          key={id}
          name={name}
          amount={amount}
          frequency={frequency}
          normalizedAmount={normalizedAmount}
          onClick={() => onClickItem(id)}
        />
      )}
    </SectionContent>
  );
}
