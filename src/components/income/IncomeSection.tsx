import { IncomeList } from "./IncomeList";
import type { IncomeItemProps } from "./IncomeItem";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface IncomeSectionProps {
  items: IncomeItemProps[];
}

export function IncomeSection({ items }: IncomeSectionProps) {
  const [list, setList] = React.useState<IncomeItemProps[]>(items);
  const [autoFocusIndex, setAutoFocusIndex] = React.useState<number | null>(
    null
  );
  const [autoFocusField, setAutoFocusField] = React.useState<
    "source" | "amount" | undefined
  >(undefined);

  const totalAmount = list.reduce((sum, item) => sum + item.amount, 0);
  const formatInteger = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <section className="space-y-3">
      <Card className="rounded-lg border">
        <CardHeader className="py-3 sm:py-4">
          <CardTitle className="text-lg sm:text-xl">Income</CardTitle>
        </CardHeader>
        {list.length === 0 ? (
          <CardContent className="py-2 sm:py-3">
            <p className="text-sm text-muted-foreground">No income added yet.</p>
          </CardContent>
        ) : (
          <>
            <CardContent className="p-0">
              <IncomeList
                items={list}
                onDelete={(index) =>
                  setList((prev) => prev.filter((_, i) => i !== index))
                }
                onUpdate={(index, next) =>
                  setList((prev) => prev.map((it, i) => (i === index ? next : it)))
                }
                autoFocusIndex={autoFocusIndex}
                autoFocusField={autoFocusField}
              />
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-3 py-2 sm:px-4 sm:py-3">
              <span className="font-semibold">Total</span>
              <span className="tabular-nums font-semibold">
                {formatInteger.format(totalAmount)}
              </span>
            </CardFooter>
          </>
        )}
      </Card>
      <div className="px-3">
        <Button
          variant="link"
          className="mt-1 p-0 text-sm"
          onClick={() => {
            // Append a placeholder item and focus source
            setList((prev) => {
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
          }}
        >
          <Plus className="mr-1 h-4 w-4" /> Add income
        </Button>
      </div>
    </section>
  );
}
