import { SectionListItem } from "./SectionListItem";

interface CategoryListItemProps {
  name: string;
  amount: number;
  onClick: () => void;
}

export function CategoryListItem({
  name,
  amount,
  onClick,
}: CategoryListItemProps) {
  return (
    <SectionListItem name={name} onClick={onClick}>
      <span className="text-sm text-gray-900">₪{amount.toLocaleString()}</span>
    </SectionListItem>
  );
}
