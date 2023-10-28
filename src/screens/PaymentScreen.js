import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/CartAction";

const PaymentScreen=()=>{
    window.scrollTo(0,0);
    let history = useNavigate();

    const cart= useSelector((state)=> state.cart)
    const {shippingAddress}= cart;
    const [paymentMethod, setPaymentMethod]= useState("PayPal")

    const dispatch= useDispatch()

    if(!shippingAddress){
        history("/shipping")
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history("/placeOrder");
    };

    return(
        <>
        <Header/>
        <div>
            <form onSubmit={submitHandler}>
                <h6>Seleccionar forma de pago</h6>
                <div>
                    <div>
                        <input type="radio" value={paymentMethod} onChange={(e)=> setPaymentMethod(e.target.value)}/>
                        <label>Paypal o Tarjeta de credito</label>
                    </div>
                </div>
                <button>
                   Continuar
                </button>
            </form>
        </div>
        </>
    )
};

export default PaymentScreen;