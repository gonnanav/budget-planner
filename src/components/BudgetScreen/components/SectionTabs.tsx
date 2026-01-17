import { Tabs, Tab } from "@heroui/tabs";
import { Entity } from "core/types";

interface SectionTabsProps {
  selectedTab: Entity;
  onTabChange: (tab: Entity) => void;
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
      onSelectionChange={(key) => onTabChange(key as Entity)}
    >
      <Tab key="item" title="Items" />
      <Tab key="category" title="Categories" />
    </Tabs>
  );
}
