import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/CartAction";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from '@mui/material/Checkbox';
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";


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
        <Container fixed>
        <Box sx={{ bgcolor: "#b3c5cd", height: "100vh" }}>
        <div className="flex flex-row justify-center items-center mt-5">
            <form onSubmit={submitHandler}>
                <h6 className="font-bold text-xl leading-none text-primary mb-4">Seleccionar forma de pago</h6>
                <div>
                    <div className="flex flex-row justify-center items-center">
                    <Checkbox value={paymentMethod} onChange={(e)=> setPaymentMethod(e.target.value)}  />
                    <InputLabel htmlFor="outlined-adornment-password">Paypal o Tarjeta de credito</InputLabel>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                <Button type="submit" variant="outlined">
                   Continuar
                </Button>
                </div>
            </form>
        </div>
        </Box>
        </Container>
        </>
    )
};

export default PaymentScreen;