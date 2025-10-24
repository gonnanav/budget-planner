"use client";

import { useContext } from "react";
import { budgetBalance, budgetItemsSum } from "@/core/budget-balance";
import { BudgetEvaluation } from "@/core/types";
import { IncomeContext } from "@/contexts/IncomeContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { SummaryRow } from "./SummaryRow";
import { IncomeSummaryRow } from "./IncomeSummaryRow";
import { ExpensesSummaryRow } from "./ExpensesSummaryRow";

export function OverviewPage() {
  const { incomes } = useContext(IncomeContext);
  const { expenses } = useContext(ExpenseContext);
  const evaluation = budgetBalance(incomes, expenses);
  const { isGood, formattedBalance } = fromEvaluation(evaluation);
  const totalIncomes = budgetItemsSum(incomes);
  const totalExpenses = budgetItemsSum(expenses);
  const { formattedIncomes, formattedExpenses } = formatAmounts(
    totalIncomes,
    totalExpenses,
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Overview</h3>
      <div className="space-y-1">
        <IncomeSummaryRow value={formattedIncomes} />
        <ExpensesSummaryRow value={formattedExpenses} />

        <SummaryRow
          label="Balance"
          value={formattedBalance}
          backgroundColor="bg-slate-50"
          valueColor={isGood ? "text-emerald-600" : "text-rose-600"}
          isBold={true}
        />
      </div>
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
