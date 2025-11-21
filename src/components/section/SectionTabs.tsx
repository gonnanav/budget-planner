import { Tabs, Tab } from "@heroui/tabs";

interface SectionTabsProps {
  selectedTab: "items" | "categories";
  onTabChange: (tab: "items" | "categories") => void;
}

export function SectionTabs({
  selectedTab: selectedKey,
  onTabChange: onTabChange,
}: SectionTabsProps) {
  return (
    <Tabs
      size="sm"
      radius="full"
      selectedKey={selectedKey}
      onSelectionChange={(key) => onTabChange(key as "items" | "categories")}
    >
      <Tab key="items" title="Items" />
      <Tab key="categories" title="Categories" />
    </Tabs>
  );
}
