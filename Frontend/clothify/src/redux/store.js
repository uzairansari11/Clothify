import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./authentication/reducer";
import { productReducer } from "./products/reducer";
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authReducer,
  productReducer,
});
export const store = legacy_createStore(
  rootReducer,
  enhancer(applyMiddleware(thunk))
);
