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

export const USER_LOGOUT_RESET = 'USER_LOGOUT_RESET';
export const ADMIN_LOGOUT_RESET = 'ADMIN_LOGOUT_RESET';

const appReducer = combineReducers({
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

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT_RESET) {
    // Clear user-specific state, keep admin + products
    state = {
      ...state,
      authReducer: undefined,
      cartReducer: undefined,
      wishlistReducer: undefined,
      orderReducer: undefined,
    };
  }
  if (action.type === ADMIN_LOGOUT_RESET) {
    // Clear admin-specific state
    state = {
      ...state,
      adminAuthReducer: undefined,
      adminProductReducer: undefined,
      adminReducer: undefined,
      adminOrderReducer: undefined,
      userReducer: undefined,
    };
  }
  return appReducer(state, action);
};

export const store = legacy_createStore(
  rootReducer,
  enhancer(applyMiddleware(thunk)),
);
