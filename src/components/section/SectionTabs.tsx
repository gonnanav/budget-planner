import { Tabs, Tab } from "@heroui/tabs";
import { Unit } from "core/types";

interface SectionTabsProps {
  selectedTab: Unit;
  onTabChange: (tab: Unit) => void;
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
      onSelectionChange={(key) => onTabChange(key as Unit)}
    >
      <Tab key="item" title="Items" />
      <Tab key="category" title="Categories" />
    </Tabs>
  );
}
