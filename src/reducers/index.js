import { INDEX } from "../const/const";
let defaultState = { isListSingleRow: true };
export default listReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INDEX.LISTVIEWUPDATE:
      return {
        ...state,
        isListSingleRow: !state.isListSingleRow
      };
    default:
      return {
        isListSingleRow: state.isListSingleRow
      };
  }
};

