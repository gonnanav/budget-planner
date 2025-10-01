"use client";

import { usePathname } from "next/navigation";
import { Tab, Tabs } from "@heroui/tabs";

export function NavTabs() {
  const pathname = usePathname();

  return (
    <Tabs fullWidth selectedKey={pathname}>
      <Tab key="/overview" title="Overview" href="/overview" />
      <Tab key="/income" title="Income" href="/income" />
      <Tab key="/expenses" title="Expenses" href="/expenses" />
    </Tabs>
  );
}
