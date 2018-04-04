import { INDEX,DISCOVER } from "../const/const";
let defaultState = { data: [], position:false };
export default (launchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INDEX.LAUNCH:
      return {
        ...state
      };
    case INDEX.ERROR:
      return {
        ...state,
        data: action.payload
      };
    case DISCOVER.DRAWER:
      return {
        ...state,
        position:action.payload
      };
    case INDEX.GENRES:
      return {
        ...state,
        genres:action.payload
      };
    default:
      return { ...state };
  }
});
