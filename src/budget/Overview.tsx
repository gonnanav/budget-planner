import { budgetBalance, budgetEntriesSum } from "./core/budget-balance";
import { BudgetEntry, BudgetEvaluation } from "./core/types";
import { SummaryRow } from "./SummaryRow";
import { IncomeSummaryRow } from "./IncomeSummaryRow";
import { ExpensesSummaryRow } from "./ExpensesSummaryRow";

export interface BalanceProps {
  incomes: BudgetEntry[];
  expenses: BudgetEntry[];
  onIncomeClick?: () => void;
  onExpensesClick?: () => void;
}

export function Overview({
  incomes,
  expenses,
  onIncomeClick,
  onExpensesClick,
}: BalanceProps) {
  const evaluation = budgetBalance(incomes, expenses);
  const { isGood, formattedBalance } = fromEvaluation(evaluation);
  const totalIncomes = budgetEntriesSum(incomes);
  const totalExpenses = budgetEntriesSum(expenses);
  const { formattedIncomes, formattedExpenses } = formatAmounts(
    totalIncomes,
    totalExpenses,
  );

  return (
    <div className="space-y-1">
      <IncomeSummaryRow value={formattedIncomes} onClick={onIncomeClick} />
      <ExpensesSummaryRow value={formattedExpenses} onClick={onExpensesClick} />

      <SummaryRow
        label="Balance"
        value={formattedBalance}
        backgroundColor="bg-slate-50"
        valueColor={isGood ? "text-emerald-600" : "text-rose-600"}
        isBold={true}
      />
    </div>
  );
}

function fromEvaluation({ status, balance }: BudgetEvaluation) {
  const isGood = status !== "negative";
  const formattedBalance = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "ILS",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(balance);

  return {
    isGood,
    formattedBalance,
  };
}

function formatAmounts(incomes: number, expenses: number) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "ILS",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  });

  return {
    formattedIncomes: formatter.format(incomes),
    formattedExpenses: formatter.format(expenses),
  };
}
