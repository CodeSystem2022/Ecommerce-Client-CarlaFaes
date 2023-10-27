import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCES,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCES,
} from "../Constants/UserContents";
import axios from "axios";
//import { Link, useLocation } from "react-router-dom";

//INICIO SESION
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/users/login`,
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCES, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//CIERRE SESION
export const logout = () => (dispatch) => {
  //const location = useLocation();
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

//REGISTRO DE USUARIO
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/users`,
      { name, email, password },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCES, payload: data });
    dispatch({ type: USER_LOGIN_SUCCES, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//detalles de usuario
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers:{
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const {data}= await axios.get(`/api/users/${id}`,config);
    dispatch({type:USER_REGISTER_SUCCES, payload:data});
  } catch (error) {
    let message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    if(message==="No autorizado, token fallido"){
      dispatch(logout())
    }
    dispatch({
      type:USER_DETAILS_FAIL,
      payload:message,
    })
  }
};
