import { INDEX } from "../const/const";
var re_state = {};
let defaultState = { data: [] };
export default (movieReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INDEX.NOWPLAYING:
      return {
        ...state,
        nowplaying: action.payload
      };
    case INDEX.TOP_RATED:
      return {
        ...state,
        toprated: action.payload
      };
    case INDEX.UPCOMING:
      return {
        ...state,
        upcoming: action.payload
      };
    case INDEX.ANTICIPATED:
      return {
        ...state,
        anticipated: action.payload
      };
    default:
      return { ...state };
  }
});
