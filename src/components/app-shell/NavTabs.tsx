import { Tab, Tabs } from "@heroui/tabs";

interface NavTabsProps {
  selectedTab: string;
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
