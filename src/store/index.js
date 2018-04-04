import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./combineReducer";

export default createStore(reducers, applyMiddleware(thunk));
