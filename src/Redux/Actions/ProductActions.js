import axios from "axios";
import {
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/ProductsConstants";

//accion asincronica para enviar los datos que se traen de la API
export const listProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get('/api/products');
    console.log(data,'data')
    dispatch(
        {
            type:PRODUCT_LIST_SUCCESS,
            payload:data,
        }
    )
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
export const listProductDetail = (id) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAIL_REQUEST,
      });
      const { data } = await axios.get(`/api/products/${id}`);
      console.log(data,'data')
      dispatch(
          {
              type:PRODUCT_DETAIL_SUCCESS,
              payload:data,
          }
      )
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
