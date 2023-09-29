import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailReducer, productListReducer } from './Reducers/ProductsReducer';

const rootReducer = combineReducers({
  productList:productListReducer,
  productsDetail:productDetailReducer,
  
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production' ? composeWithDevTools() : false,
});

export default store;
