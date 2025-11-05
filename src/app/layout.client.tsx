"use client";

import { AppLayout } from "@/components/app-layout";
import { useContext } from "react";
import { ItemDrawer } from "@/components/item-drawer";
import { ItemDrawerContext } from "@/contexts/ItemDrawerContext";
import { CategoryDrawerContext } from "@/contexts/CategoryDrawerContext";
import { CategoryDrawer } from "@/components/category-drawer";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const itemDrawerValue = useContext(ItemDrawerContext);
  const categoryDrawerValue = useContext(CategoryDrawerContext);

  return (
    <>
      <AppLayout>{children}</AppLayout>
      <ItemDrawer {...itemDrawerValue} />
      <CategoryDrawer {...categoryDrawerValue} />
    </>
  );
}
