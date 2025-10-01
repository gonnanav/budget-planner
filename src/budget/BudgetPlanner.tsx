"use client";

import React, { useState, useContext } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { IncomeSection } from "./IncomeSection";
import { ExpenseSection } from "./ExpenseSection";
import { Overview } from "./Overview";
import { IncomeContext } from "@/contexts/IncomeContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";

export function BudgetPlanner() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const { incomes, addIncome, updateIncome, deleteIncome } =
    useContext(IncomeContext);
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenseContext);

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
