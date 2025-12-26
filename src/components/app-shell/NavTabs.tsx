import { Tab, Tabs } from "@heroui/tabs";
import type { TabKey } from "./types";

interface NavTabsProps {
  selectedTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export function NavTabs({ selectedTab, onTabChange }: NavTabsProps) {
  return (
    <Tabs
      fullWidth
      selectedKey={selectedTab}
      onSelectionChange={(key) => onTabChange(key as TabKey)}
    >
      <Tab key="overview" title="Overview" />
      <Tab key="income" title="Income" />
      <Tab key="expenses" title="Expenses" />
    </Tabs>
  );
}
