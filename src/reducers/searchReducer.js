import {INDEX } from "../const/const";

let defaultState = { data: [] };
export default (searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INDEX.SEARCH_RESULTS:
      return {
        ...state,
        data: action.payload
      };
    case INDEX.IMAGE_FOUND:
      return {
        ...state,
        data: action.payload
      };
    default:
      return { ...state };
  }
});
