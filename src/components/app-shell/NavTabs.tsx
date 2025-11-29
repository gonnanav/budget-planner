import { Tab, Tabs } from "@heroui/tabs";
import type { TabKey } from "./types";

interface NavTabsProps {
  selectedTab: TabKey;
}

export function NavTabs({ selectedTab }: NavTabsProps) {
  return (
    <Tabs fullWidth selectedKey={selectedTab}>
      <Tab key="overview" title="Overview" href="/overview" />
      <Tab key="income" title="Income" href="/income" />
      <Tab key="expenses" title="Expenses" href="/expenses" />
    </Tabs>
  );
}
