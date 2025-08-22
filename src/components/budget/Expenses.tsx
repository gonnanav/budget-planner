import { Button } from "@heroui/button";
import { Plus } from "lucide-react";
import {
  addExpense,
  updateExpense,
  removeExpense,
  canRemoveExpense,
  expenseLabel,
} from "./expenses";
import { Expense } from "./Expense";

interface ExpensesProps {
  expenses: number[];
  onChange: (expenses: number[]) => void;
}

export function Expenses({ expenses, onChange }: ExpensesProps) {
  const canRemove = canRemoveExpense(expenses);

  const handleAddExpense = () => {
    onChange(addExpense(expenses));
  };

  const handleRemoveExpense = (index: number) => {
    onChange(removeExpense(expenses, index));
  };

  const handleUpdateExpense = (index: number, value: number) => {
    onChange(updateExpense(expenses, index, value));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Expenses</h3>
        <Button
          size="sm"
          color="primary"
          onPress={handleAddExpense}
          isIconOnly
          aria-label="Add expense"
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {expenses.map((expense, index) => (
          <Expense
            key={index}
            label={expenseLabel(index)}
            amount={expense}
            canRemove={canRemove}
            onChange={(value) => handleUpdateExpense(index, value)}
            onRemove={() => handleRemoveExpense(index)}
          />
        ))}
      </div>
    </div>
  );
}
