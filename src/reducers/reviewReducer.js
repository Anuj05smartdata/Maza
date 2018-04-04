import { INDEX } from "../const/const";
let defaultState = { data: [] };
export default (reviewReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INDEX.REVIEW_FOUND:
      return {
        ...state,
        data: action.payload
      };
    default:
      return { ...state };
  }
});
