import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailReducer, productListReducer } from './Reducers/ProductsReducer';
import { cartReducer } from './Reducers/CartReducers';

const rootReducer = combineReducers({
  productList:productListReducer,
  productsDetail:productDetailReducer,
  cart: cartReducer,
  
});

const cartItemsFromLocalStore = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) :[];

const initialState={
  cart:{
    cartItems: cartItemsFromLocalStore,
  }
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production' ? composeWithDevTools() : false,
  preloadedState: initialState, 
});

export default store;
