import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './Reducers/ProductsReducer';
// Importa tus reducers aquí o crea nuevos usando createSlice

const rootReducer = combineReducers({
  // Agrega tus reducers aquí
  productListReducer
  
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production' ? composeWithDevTools() : false,
});

export default store;
