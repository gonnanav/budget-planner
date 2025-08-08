import React, { useEffect, useRef, useState, useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash } from "lucide-react";

export interface IncomeItemProps {
  source: string;
  amount: number;
  onDelete?: () => void;
  onUpdate?: (next: { source: string; amount: number }) => void;
  autoFocusField?: "source" | "amount";
}

export function IncomeItem({
  source,
  amount,
  onDelete,
  onUpdate,
  autoFocusField,
}: IncomeItemProps) {
  const formattedAmount = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  const [isEditing, setIsEditing] = useState(false);
  const [draftSource, setDraftSource] = useState(source);
  const [draftAmount, setDraftAmount] = useState(String(amount));

  const sourceInputRef = useRef<HTMLInputElement | null>(null);
  const amountInputRef = useRef<HTMLInputElement | null>(null);
  const uid = useId();
  const sourceId = `${uid}-source`;
  const amountId = `${uid}-amount`;

  // Enter edit mode automatically on mount when requested
  useEffect(() => {
    if (!autoFocusField || !onUpdate) return;
    setIsEditing(true);
    requestAnimationFrame(() => {
      if (autoFocusField === "source") {
        sourceInputRef.current?.focus();
      } else {
        amountInputRef.current?.focus();
      }
    });
    // Only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commitAll = () => {
    if (!onUpdate) {
      setIsEditing(false);
      return;
    }
    const parsed = Number.parseInt(draftAmount, 10);
    const nextAmount = Number.isNaN(parsed) ? 0 : parsed;
    const nextSource = draftSource.trim();
    onUpdate({ source: nextSource, amount: nextAmount });
    setIsEditing(false);
  };

  return (
    <div
      className="group flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2"
      tabIndex={0}
      onClick={() => {
        if (!onUpdate) return;
        setDraftSource(source);
        setDraftAmount(String(amount));
        setIsEditing(true);
      }}
      onFocus={() => {
        if (!onUpdate) return;
        setDraftSource(source);
        setDraftAmount(String(amount));
        setIsEditing(true);
      }}
      onBlur={(e) => {
        if (!onUpdate) return;
        const next = e.relatedTarget as Node | null;
        if (next && e.currentTarget.contains(next)) return; // still inside
        commitAll();
      }}
    >
      {isEditing ? (
        <>
          <div className="min-w-0 flex-1">
            <Label htmlFor={sourceId} className="sr-only">
              Income source
            </Label>
            <Input
              id={sourceId}
              ref={sourceInputRef}
              value={draftSource}
              onChange={(e) => setDraftSource(e.target.value)}
              placeholder="Source"
              className="h-9 text-sm"
            />
          </div>
          <div className="w-28">
            <Label htmlFor={amountId} className="sr-only">
              Amount
            </Label>
            <Input
              id={amountId}
              ref={amountInputRef}
              value={draftAmount}
              onChange={(e) => setDraftAmount(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              className="h-9 text-right text-sm tabular-nums"
            />
          </div>
          {onDelete && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Delete income item"
                    onClick={onDelete}
                    className="ml-auto hidden shrink-0 group-focus-within:inline-flex"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </>
      ) : (
        <>
          <span className="min-w-0 flex-1 break-words font-medium">{source}</span>
          <span className="shrink-0 tabular-nums">{formattedAmount}</span>
        </>
      )}
    </div>
  );
}
