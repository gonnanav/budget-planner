import { AmountInput } from "./AmountInput";

interface IncomesProps {
  incomes: number;
  onChange: (value: number) => void;
}

export function Incomes({ incomes, onChange }: IncomesProps) {
  return <AmountInput label="Incomes" amount={incomes} onChange={onChange} />;
}
