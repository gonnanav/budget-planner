import { SectionLayout } from "./SectionLayout";
import { Heading } from "@/components/shared/Heading";
import { AddButton } from "./AddButton";
import { SectionTabs } from "./SectionTabs";
import { SectionList } from "./SectionList";
import { EmptyStateText } from "./EmptyStateText";
import { BackButton } from "./BackButton";

interface SectionShellProps<T> {
  headingText: string;
  addButtonLabel: string;
  selectedTab: "items" | "categories";
  items: T[];
  emptyItemsText: string;
  onAddClick: () => void;
  onTabChange: (tab: "items" | "categories") => void;
  children: (item: T) => React.ReactNode;
}

export function SectionShell<T>({
  headingText,
  addButtonLabel,
  selectedTab,
  items,
  emptyItemsText,
  onAddClick,
  onTabChange,
  children,
}: SectionShellProps<T>) {
  return (
    <SectionLayout
      heading={<Heading>{headingText}</Heading>}
      backButton={<BackButton />}
      addButton={<AddButton label={addButtonLabel} onClick={onAddClick} />}
      tabs={<SectionTabs selectedTab={selectedTab} onTabChange={onTabChange} />}
    >
      <SectionList
        items={items}
        empty={<EmptyStateText>{emptyItemsText}</EmptyStateText>}
      >
        {children}
      </SectionList>
    </SectionLayout>
  );
}
