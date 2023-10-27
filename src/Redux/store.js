import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailReducer,
  productListReducer,
} from "./Reducers/ProductsReducer";
import { cartReducer } from "./Reducers/CartReducers";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./Reducers/userReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productsDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer,
});

//carrito
const cartItemsFromLocalStore = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStore,
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
  updateLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools:
    process.env.NODE_ENV !== "production" ? composeWithDevTools() : false,
  preloadedState: initialState,
});

export default store;
