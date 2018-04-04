import { TVCONST } from "../const/const";
let defaultState = { data: [] };
export default (tvReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TVCONST.AIRINGTODAY:
      return {
        ...state,
        airingtoday: action.payload
      };
    case TVCONST.ONTHEAIR:
      return {
        ...state,
        ontheair: action.payload
      };
    case TVCONST.TOP_RATED:
      return {
        ...state,
        toprated: action.payload
      };
    case TVCONST.POPULAR:
      return {
        ...state,
        popular: action.payload
      };
    case TVCONST.ERROR:
      return {
        ...state,
        data: action.payload
      };
    default:
      return { ...state };
  }
});
