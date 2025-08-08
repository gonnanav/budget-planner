import { IncomeList } from "./IncomeList";
import type { IncomeItemProps } from "./IncomeItem";
import React from "react";

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
      <h2 className="px-3 text-xl font-semibold">Income</h2>
      {list.length === 0 ? (
        <p className="px-3 text-sm text-muted-foreground">
          No income added yet.
        </p>
      ) : (
        <div className="overflow-hidden rounded-md border">
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
          <div className="flex items-center justify-between border-t px-3 py-2">
            <span className="font-semibold">Total</span>
            <span className="tabular-nums font-semibold">
              {formatInteger.format(totalAmount)}
            </span>
          </div>
        </div>
      )}
      <div className="px-3">
        <button
          type="button"
          className="mt-1 text-sm text-primary hover:underline"
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
          + Add income
        </button>
      </div>
    </section>
  );
}
