import { createItem } from "domain/items";
import { housing, transportation, food, personal } from "./expense-categories";

export const rent = createItem({
  id: "rent",
  name: "Rent",
  amount: 1400,
  categoryId: housing.id,
  section: "expenses",
});

export const electricity = createItem({
  id: "electricity",
  name: "Electricity",
  amount: 120,
  categoryId: housing.id,
  section: "expenses",
});

export const water = createItem({
  id: "water",
  name: "Water",
  amount: 60,
  categoryId: housing.id,
  section: "expenses",
});

export const internet = createItem({
  id: "internet",
  name: "Internet",
  amount: 70,
  categoryId: housing.id,
  section: "expenses",
});

export const gas = createItem({
  id: "gas",
  name: "Gas",
  amount: 150,
  categoryId: transportation.id,
  section: "expenses",
});

export const carInsurance = createItem({
  id: "car-insurance",
  name: "Car Insurance",
  amount: 140,
  categoryId: transportation.id,
  section: "expenses",
});

export const groceries = createItem({
  id: "groceries",
  name: "Groceries",
  amount: 500,
  categoryId: food.id,
  section: "expenses",
});

export const diningOut = createItem({
  id: "dining-out",
  name: "Dining Out",
  amount: 200,
  categoryId: food.id,
  section: "expenses",
});

export const gymMembership = createItem({
  id: "gym-membership",
  name: "Gym Membership",
  amount: 50,
  categoryId: personal.id,
  section: "expenses",
});

export const streamingServices = createItem({
  id: "streaming-services",
  name: "Streaming Services",
  amount: 30,
  categoryId: personal.id,
  section: "expenses",
});

export const hobbies = createItem({
  id: "hobbies",
  name: "Hobbies",
  amount: 150,
  categoryId: personal.id,
  section: "expenses",
});

