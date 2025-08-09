import { useState } from "react";
import type { IncomeItemProps } from "./IncomeItem";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { IncomeList } from "./IncomeList";

export interface IncomeSectionProps {
  initialItems?: IncomeItemProps[];
}

export function IncomeSection({ initialItems = [] }: IncomeSectionProps) {
  const [items, setItems] = useState<IncomeItemProps[]>(initialItems);
  const [autoFocusIndex, setAutoFocusIndex] = useState<number | null>(null);
  const [autoFocusField, setAutoFocusField] = useState<
    "source" | "amount" | undefined
  >(undefined);

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const formatInteger = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleAddIncome = () => {
    // Append a placeholder item and focus source
    setItems((prev) => {
      const next = [...prev, { source: "", amount: 0 }];
      // focus the last index
      setAutoFocusIndex(next.length - 1);
      return next;
    });
    setAutoFocusField("source");
    // Reset focus flags after a tick so they only apply to the next mount
    setTimeout(() => {
      setAutoFocusIndex(null);
      setAutoFocusField(undefined);
    }, 0);
  };

  const handleDeleteIncome = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateIncome = (index: number, next: IncomeItemProps) => {
    setItems((prev) => prev.map((it, i) => (i === index ? next : it)));
  };

  return (
    <section className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Income</CardTitle>
        </CardHeader>
        {items.length === 0 ? (
          <CardContent className="py-0 sm:py-3">
            <p className="text-sm text-muted-foreground">
              No income added yet.
            </p>
          </CardContent>
        ) : (
          <>
            <CardContent className="p-1">
              <IncomeList
                items={items}
                onDelete={handleDeleteIncome}
                onUpdate={handleUpdateIncome}
                autoFocusIndex={autoFocusIndex}
                autoFocusField={autoFocusField}
              />
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t">
              <span className="font-semibold">Total</span>
              <span className="tabular-nums font-semibold">
                {formatInteger.format(totalAmount)}
              </span>
            </CardFooter>
          </>
        )}
      </Card>
      <div className="px-3">
        <Button variant="link" className="text-sm" onClick={handleAddIncome}>
          <Plus className="mr-1 h-4 w-4" /> Add income
        </Button>
      </div>
    </section>
  );
}
