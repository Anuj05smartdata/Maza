import { combineReducers } from "redux";
import listReducer from "../reducers/index"
import launchReducer from "../reducers/launchReducer";
import movieReducer from "../reducers/movieReducer";
import searchReducer from "../reducers/searchReducer";
import detailReducer from "../reducers/detailReducer";
import castReducer from "../reducers/castReducer";
import reviewReducer from "../reducers/reviewReducer";
import tvReducer from "../reducers/tvReducer";
import personReducer from "../reducers/personReducer";
import discoverReducer from "../reducers/discoverReducer";
import filterMovieReducer from "../reducers/filterReducer";
import filterPersonReducer from "../reducers/filterPersonReducer";
import filterTVReducer from "../reducers/filterTVReducer";

export default (rootReducer = combineReducers({
  launchReducer,
  movieReducer,
  searchReducer,
  detailReducer,
  castReducer,
  reviewReducer,
  tvReducer,
  listReducer,
  personReducer,
  discoverReducer,
  filterMovieReducer,
  filterTVReducer,
  filterPersonReducer
}));
