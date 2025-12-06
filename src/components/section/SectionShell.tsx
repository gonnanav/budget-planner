import { SectionLayout } from "./SectionLayout";
import { Heading } from "@/components/shared/Heading";
import { AddButton } from "@/components/shared/AddButton";
import { SectionTabs } from "./SectionTabs";
import { SectionList } from "./SectionList";
import { EmptyStateText } from "@/components/shared/EmptyStateText";

interface SectionShellProps<T> {
  headingText: string;
  addButtonLabel: string;
  selectedTab: "items" | "categories";
  items: T[];
  emptyText: string;
  onAddButtonClick: () => void;
  onTabChange: (tab: "items" | "categories") => void;
  children: (item: T) => React.ReactNode;
}

export function SectionShell<T>({
  headingText,
  addButtonLabel,
  selectedTab,
  items,
  emptyText,
  onAddButtonClick,
  onTabChange,
  children,
}: SectionShellProps<T>) {
  return (
    <SectionLayout
      heading={<Heading>{headingText}</Heading>}
      addButton={
        <AddButton label={addButtonLabel} onClick={onAddButtonClick} />
      }
      tabs={<SectionTabs selectedTab={selectedTab} onTabChange={onTabChange} />}
    >
      <SectionList
        items={items}
        empty={<EmptyStateText>{emptyText}</EmptyStateText>}
      >
        {children}
      </SectionList>
    </SectionLayout>
  );
}
