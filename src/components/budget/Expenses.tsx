import { AmountInput } from "./AmountInput";

interface ExpensesProps {
  expenses: number;
  onChange: (value: number) => void;
}

export function Expenses({ expenses, onChange }: ExpensesProps) {
  return (
    <AmountInput
      id="expenses"
      label="Expenses"
      amount={expenses}
      onChange={onChange}
    />
  );
}
