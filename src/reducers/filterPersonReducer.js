import { INDEX } from "../const/const";

let defaultState = { data: [] };

export default (filterPersonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INDEX.FILTER_PERSON:
      return {
        ...state,
        data: action.payload
      };
    default:
      return { ...state };
  }
});
