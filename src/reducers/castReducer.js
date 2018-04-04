import { INDEX } from "../const/const";
let defaultState = { data: [] };
export default (castReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INDEX.CAST_FOUND:
      return {
        ...state,
        data: action.payload
      };
    default:
      return { ...state };
  }
});
