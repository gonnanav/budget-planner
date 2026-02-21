import { createBudget, createSectionState } from "domain/budget";
import { employment, passive } from "./income-categories";
import { housing, transportation, food, personal } from "./expense-categories";
import { salary, freelance, investment } from "./incomes";
import {
  rent,
  electricity,
  water,
  internet,
  gas,
  carInsurance,
  groceries,
  diningOut,
  gymMembership,
  streamingServices,
  hobbies,
} from "./expenses";
import { createItemVariant } from "./test-utils";

// Surplus — full canonical case: rich income, rich expenses, comfortable surplus
export const surplusBudget = createBudget(
  createSectionState([salary, freelance, investment], [employment, passive]),
  createSectionState(
    [
      rent,
      electricity,
      water,
      internet,
      gas,
      carInsurance,
      groceries,
      diningOut,
      gymMembership,
      streamingServices,
      hobbies,
    ],
    [housing, transportation, food, personal],
  ),
);

// Deficit — lean realistic case: entry-level salary falls short of basic living costs
// income $2,000 < expenses $2,100 → deficit $100
const deficitSalary = createItemVariant(salary, { amount: 2000 });
const deficitRent = createItemVariant(rent, { amount: 1500 });
const deficitGroceries = createItemVariant(groceries, { amount: 600 });
export const deficitBudget = createBudget(
  createSectionState([deficitSalary], [employment]),
  createSectionState([deficitRent, deficitGroceries], [housing, food]),
);

// Balanced — lean realistic case: salary exactly covers basic living costs
// income $2,000 = expenses $2,000 → balanced
const balancedSalary = createItemVariant(salary, { amount: 2000 });
const balancedRent = createItemVariant(rent, { amount: 1500 });
const balancedGroceries = createItemVariant(groceries, { amount: 500 });
export const balancedBudget = createBudget(
  createSectionState([balancedSalary], [employment]),
  createSectionState([balancedRent, balancedGroceries], [housing, food]),
);

// Empty — fresh start: no items or categories yet
export const emptyBudget = createBudget(
  createSectionState([], []),
  createSectionState([], []),
);
