import { ItemLayout } from "./ItemLayout";
import { PrimaryLine } from "./PrimaryLine";
import { NameText } from "./NameText";
import { AmountText } from "./AmountText";
import { SecondaryLine } from "./SecondaryLine";
import { FrequencyText } from "./FrequencyText";
import { NormalizedAmountText } from "./NormalizedAmountText";
import { formatItemDisplay } from "./formatItemDisplay";

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
