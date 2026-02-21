import { createBudget, createSectionState } from "domain/budget";
import { employment, passive } from "./incomeCategories";
import { housing, transportation, food, personal } from "./expenseCategories";
import { salary, freelance, investment } from "./incomeItems";
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
} from "./expenseItems";
import { createItemVariant } from "./utils";

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

const deficitSalary = createItemVariant(salary, { amount: 2000 });
const deficitRent = createItemVariant(rent, { amount: 1500 });
const deficitGroceries = createItemVariant(groceries, { amount: 600 });

export const deficitBudget = createBudget(
  createSectionState([deficitSalary], [employment]),
  createSectionState([deficitRent, deficitGroceries], [housing, food]),
);

const balancedSalary = createItemVariant(salary, { amount: 2000 });
const balancedRent = createItemVariant(rent, { amount: 1500 });
const balancedGroceries = createItemVariant(groceries, { amount: 500 });

export const balancedBudget = createBudget(
  createSectionState([balancedSalary], [employment]),
  createSectionState([balancedRent, balancedGroceries], [housing, food]),
);

export const emptyBudget = createBudget(
  createSectionState([], []),
  createSectionState([], []),
);
