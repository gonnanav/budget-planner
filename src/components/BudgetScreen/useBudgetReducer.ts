export type Section = "income" | "expense";
export type SelectedSection = Section | null;
export type Unit = "items" | "categories";

type State = {
  section: SelectedSection;
  unit: Unit;
};

export const initialState: State = {
  section: null,
  unit: "items",
};

type Action =
  | { type: "sectionToggle"; section: Section }
  | { type: "unitSelected"; unit: Unit };

export function budgetReducer(state: State, action: Action): State {
  switch (action.type) {
    case "sectionToggle": {
      return {
        ...state,
        section: state.section === action.section ? null : action.section,
      };
    }
    case "unitSelected": {
      return { ...state, unit: action.unit };
    }
    default: {
      return state;
    }
  }
}
