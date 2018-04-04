import { INDEX } from "../const/const";

let defaultState = { data: [] };
export default (filterMovieReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INDEX.FILTER_MOVIES:
      return {
        ...state,
        data: action.payload
      };
    default:
      return { ...state };
  }
});
