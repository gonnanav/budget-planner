"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { useIncomes } from "./hooks/useIncomes";
import { useExpenses } from "./hooks/useExpenses";
import { IncomeSection } from "./IncomeSection";
import { ExpenseSection } from "./ExpenseSection";
import { Overview } from "./Overview";
import { BudgetEntry } from "./core/types";

interface BudgetPlannerProps {
  initialIncomes?: BudgetEntry[];
  initialExpenses?: BudgetEntry[];
}

export function BudgetPlanner({
  initialIncomes,
  initialExpenses,
}: BudgetPlannerProps) {
  const [selectedTab, setSelectedTab] = useState("overview");

  const { incomes, addIncome, updateIncome, deleteIncome } =
    useIncomes(initialIncomes);
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useExpenses(initialExpenses);

  const handleTabChange = (key: React.Key) => {
    setSelectedTab(String(key));
  };

  return (
    <Tabs
      selectedKey={selectedTab}
      onSelectionChange={handleTabChange}
      fullWidth
    >
      <Tab key="overview" title="Overview">
        <Overview
          incomes={incomes}
          expenses={expenses}
          onIncomeClick={() => setSelectedTab("income")}
          onExpensesClick={() => setSelectedTab("expenses")}
        />
      </Tab>
      <Tab key="income" title="Income">
        <IncomeSection
          incomes={incomes}
          onAddEntry={addIncome}
          onUpdateEntry={updateIncome}
          onDeleteEntry={deleteIncome}
        />
      </Tab>
      <Tab key="expenses" title="Expenses">
        <ExpenseSection
          expenses={expenses}
          onAddEntry={addExpense}
          onUpdateEntry={updateExpense}
          onDeleteEntry={deleteExpense}
        />
      </Tab>
    </Tabs>
  );
}
