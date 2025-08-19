import { AmountInput } from "./AmountInput";

interface ExpensesProps {
  expenses: number;
  onChange: (value: number) => void;
}

export function Expenses({ expenses, onChange }: ExpensesProps) {
  return <AmountInput label="Expenses" amount={expenses} onChange={onChange} />;
}
