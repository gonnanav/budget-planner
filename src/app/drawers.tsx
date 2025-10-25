"use client";

import { useContext } from "react";
import { ItemDrawer } from "@/components/item-drawer";
import { ItemDrawerContext } from "@/contexts/ItemDrawerContext";

export function AppDrawers() {
  const itemDrawerValue = useContext(ItemDrawerContext);

  return (
    <>
      <ItemDrawer {...itemDrawerValue} />
    </>
  );
}
