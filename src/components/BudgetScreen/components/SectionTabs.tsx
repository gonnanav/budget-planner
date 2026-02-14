import { Tabs } from "@mantine/core";
import type { Entity } from "core/types";

interface SectionTabsProps {
  selectedTab: Entity;
  onTabChange: (tab: Entity) => void;
}

export function SectionTabs({
  selectedTab,
  onTabChange,
}: SectionTabsProps) {
  const handleChange = (value: string | null) => {
    if (value) onTabChange(value as Entity);
  };

  return (
    <Tabs value={selectedTab} onChange={handleChange}>
      <Tabs.List>
        <Tabs.Tab value="item">Items</Tabs.Tab>
        <Tabs.Tab value="category">Categories</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
