import { INDEX } from "../const/const";

let defaultState = { data: [] };

export default (filterTVReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INDEX.FILTER_TV:
      return {
        ...state,
        data: action.payload
      };
    default:
      return { ...state };
  }
});
