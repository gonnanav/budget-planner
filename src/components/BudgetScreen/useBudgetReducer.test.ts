import { describe, expect, test } from "vitest";
import {
  budgetReducer,
  initialState,
  type SelectedSection,
  type Unit,
} from "./useBudgetReducer";

test("defaults applied", () => {
  expect(initialState).toEqual(
    expect.objectContaining({
      section: null,
      unit: "items",
    }),
  );
});

describe("sectionToggle", () => {
  test.each<[SelectedSection, SelectedSection]>([
    [null, "income"],
    ["income", null],
    ["expense", "income"],
  ])("income toggled", (initial, expected) => {
    const nextState = budgetReducer(
      { ...initialState, section: initial },
      {
        type: "sectionToggle",
        section: "income",
      },
    );

    expect(nextState.section).toBe(expected);
  });

  test.each<[SelectedSection, SelectedSection]>([
    [null, "expense"],
    ["income", "expense"],
    ["expense", null],
  ])("expense toggled", (initial, expected) => {
    const nextState = budgetReducer(
      { ...initialState, section: initial },
      {
        type: "sectionToggle",
        section: "expense",
      },
    );

    expect(nextState.section).toBe(expected);
  });
});

describe("unitSelected", () => {
  test.each<Unit>(["items", "categories"])("items selected", (initial) => {
    const nextState = budgetReducer(
      { ...initialState, unit: initial },
      {
        type: "unitSelected",
        unit: "items",
      },
    );

    expect(nextState.unit).toBe("items");
  });

  test.each<Unit>(["items", "categories"])("categories selected", (initial) => {
    const nextState = budgetReducer(
      { ...initialState, unit: initial },
      {
        type: "unitSelected",
        unit: "categories",
      },
    );

    expect(nextState.unit).toBe("categories");
  });
});
