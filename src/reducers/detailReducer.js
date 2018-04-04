import { INDEX } from "../const/const";
let defaultState = { data: [] };
export default (detailReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INDEX.INFO_FOUND:
      return {
        ...state,
        data: action.payload
      };
    default:
      return { ...state };
  }
});
