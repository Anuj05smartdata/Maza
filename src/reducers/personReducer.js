import {POPULAR} from "../const/const";
let defaultState = { data: [] };
export default (personReducer = (state = defaultState, action) => {
  switch (action.type) {
    case POPULAR.PERSON_FOUND:
      return {
        ...state,
        data: action.payload
      };
    case POPULAR.PERSON_IMAGE_FOUND:
      return {
        ...state,
        data1: action.payload
      };
    case POPULAR.PERSON_DETAIL_FOUND:
      return {
        ...state,
        data2: action.payload
      };
    case POPULAR.ERROR:
      return {
        ...state,
        data3: action.payload
      };
    case POPULAR.MOVIE_FOUND:
      return {
        ...state,
        data4: action.payload
      };
      case POPULAR.TV_FOUND:
      return {
        ...state,
        data5: action.payload
      };
    default:
      return { ...state };
  }
});
