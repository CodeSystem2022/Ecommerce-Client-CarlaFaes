import axios from "axios";
import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCES,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/ProductsConstants";
import { logout } from "./UserAction";

//accion asincronica para enviar los datos que se traen de la API
export const listProduct = (keywords=" ") => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get(`/api/products?keywords=${keywords}`);
    console.log(data, "data de listProducts");
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

//detalle de producto
export const listProductDetail =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAIL_REQUEST,
      });
      const { data } = await axios.get(`/api/products/${id}`);
      console.log(data, "data");
      dispatch({
        type: PRODUCT_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

//crear review de producto
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
     let data= await axios.post(`/api/products/${productId}/review`, review, config);
     console.log(data,"data");
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCES ,data});
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "No autorizado, token fallido") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
