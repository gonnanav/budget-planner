"use client";

import { useContext } from "react";
import { ItemDrawer } from "@/components/item-drawer";
import { ItemDrawerContext } from "@/contexts/ItemDrawerContext";
import { CategoryDrawerContext } from "@/contexts/CategoryDrawerContext";
import { CategoryDrawer } from "@/components/category-drawer";

export function AppDrawers() {
  const itemDrawerValue = useContext(ItemDrawerContext);
  const categoryDrawerValue = useContext(CategoryDrawerContext);

  return (
    <>
      <ItemDrawer {...itemDrawerValue} />
      <CategoryDrawer {...categoryDrawerValue} />
    </>
  );
}
