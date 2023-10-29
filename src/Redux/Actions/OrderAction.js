//crear orden de pedido

import axios from "axios"
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../Constants/OrderConstants"
import { CART_CLEAR_ITEMS } from "../Constants/CartConstants"
import { logout } from "./UserAction"

export const createOrder=(order)=> async (dispatch,getState)=>{
    try{
        dispatch({type: ORDER_CREATE_REQUEST})
        const {userLogin:{userInfo}}=getState()

        const config={
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data}= await axios.post(`/api/orders`, order, config);
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data});
        dispatch({type: CART_CLEAR_ITEMS, payload:data})
        localStorage.removeItem("cartItems");
    }catch(e){
        const message= e.response && e.response.data.message ? e.response.data.message: e.message;
        if (message === "No autorizado, token fallido") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:message,
        })
    }
}