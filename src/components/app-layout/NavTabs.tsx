"use client";

import { useContext } from "react";
import { Tab, Tabs } from "@heroui/tabs";
import { PathnameContext } from "@/contexts/PathnameContext";

export function NavTabs() {
  const pathname = useContext(PathnameContext);

  return (
    <Tabs fullWidth selectedKey={pathname}>
      <Tab key="/overview" title="Overview" href="/overview" />
      <Tab key="/income" title="Income" href="/income" />
      <Tab key="/expenses" title="Expenses" href="/expenses" />
    </Tabs>
  );
}
