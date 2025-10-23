import { cn } from "@/lib/utils";

interface ItemListItemProps {
  name: string;
  amount: number | null;
  frequency: string;
  normalizedAmount: number;
  onClick: () => void;
}

export function ItemListItem({
  name,
  amount,
  frequency,
  normalizedAmount,
  onClick,
}: ItemListItemProps) {
  const {
    formattedAmount,
    frequencyText,
    formattedNormalizedAmount,
    showNormalizedAmount,
  } = formatItemDisplay({ amount, frequency, normalizedAmount });

  return (
    <ItemLayout name={name} onClick={onClick}>
      <PrimaryLine>
        <NameText>{name}</NameText>
        {formattedAmount && <AmountText>{formattedAmount}</AmountText>}
      </PrimaryLine>
      <SecondaryLine>
        <FrequencyText>{frequencyText}</FrequencyText>
        {showNormalizedAmount && (
          <NormalizedAmountText>
            {formattedNormalizedAmount}
          </NormalizedAmountText>
        )}
      </SecondaryLine>
    </ItemLayout>
  );
}

interface ItemLayoutProps {
  name: string;
  onClick: () => void;
  children: React.ReactNode;
}

function ItemLayout({ name, onClick, children }: ItemLayoutProps) {
  return (
    <article
      aria-label={name}
      className={cn(
        "flex flex-col rounded-md px-3 py-2 cursor-pointer",
        "bg-slate-50 hover:opacity-80 active:bg-slate-100",
        "transition-colors transition-opacity",
      )}
      onClick={onClick}
    >
      {children}
    </article>
  );
}

interface NameTextProps {
  children: React.ReactNode;
}

function NameText({ children }: NameTextProps) {
  return (
    <span className="text-muted-foreground text-sm truncate">{children}</span>
  );
}

interface AmountTextProps {
  children: React.ReactNode;
}

function AmountText({ children }: AmountTextProps) {
  return <span className="text-sm text-gray-900">{children}</span>;
}

interface FrequencyTextProps {
  children: React.ReactNode;
}

function FrequencyText({ children }: FrequencyTextProps) {
  return <span className="text-xs text-gray-500">{children}</span>;
}

interface NormalizedAmountTextProps {
  children: React.ReactNode;
}

function NormalizedAmountText({ children }: NormalizedAmountTextProps) {
  return <span className="text-xs text-gray-500">{children}</span>;
}

interface PrimaryLineProps {
  children: React.ReactNode;
}

function PrimaryLine({ children }: PrimaryLineProps) {
  return (
    <div className="flex items-baseline justify-between w-full gap-3">
      {children}
    </div>
  );
}

interface SecondaryLineProps {
  children: React.ReactNode;
}

function SecondaryLine({ children }: SecondaryLineProps) {
  return (
    <div className="flex items-center justify-between w-full gap-3 mt-1">
      {children}
    </div>
  );
}

function formatItemDisplay({
  amount,
  frequency,
  normalizedAmount,
}: {
  amount: number | null;
  frequency: string;
  normalizedAmount: number;
}) {
  return {
    formattedAmount: amount ? `₪${amount.toLocaleString()}` : null,
    frequencyText: frequency === "monthly" ? "Monthly" : "Bi-monthly",
    formattedNormalizedAmount: `₪${normalizedAmount.toLocaleString()}/month`,
    showNormalizedAmount: frequency === "biMonthly",
  };
}
