import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./User_Redux/authentication/reducer";
import { productReducer } from "./User_Redux/products/reducer";
import { cartReducer } from "./User_Redux/cart/reducer"
import { wishlistReducer } from "./User_Redux/wishlist/reducer"
import { userReducer } from "./Admin_Redux/users/reducer"
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authReducer,
  productReducer,
  cartReducer,
  wishlistReducer,
  userReducer
});
export const store = legacy_createStore(
  rootReducer,
  enhancer(applyMiddleware(thunk))
);
