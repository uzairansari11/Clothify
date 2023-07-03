import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from 'redux';
import thunk from 'redux-thunk';

import { adminProductReducer } from './Admin_Redux/admin_products/reducer';
import { adminReducer } from './Admin_Redux/admins/reducer';
import { adminAuthReducer } from './Admin_Redux/authentication/reducer';
import { adminOrderReducer } from './Admin_Redux/order/reducer';
import { userReducer } from './Admin_Redux/users/reducer';
import { authReducer } from './User_Redux/authentication/reducer';
import { cartReducer } from './User_Redux/cart/reducer';
import { orderReducer } from './User_Redux/order/reducer';
import { productReducer } from './User_Redux/products/reducer';
import { wishlistReducer } from './User_Redux/wishlist/reducer';
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authReducer,
  productReducer,
  cartReducer,
  wishlistReducer,
  userReducer,
  adminProductReducer,
  adminAuthReducer,
  adminReducer,
  orderReducer,
  adminOrderReducer,
});
export const store = legacy_createStore(
  rootReducer,
  enhancer(applyMiddleware(thunk)),
);
