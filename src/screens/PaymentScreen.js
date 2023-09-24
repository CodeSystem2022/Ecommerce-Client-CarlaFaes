import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const PaymentScreen=()=>{
    window.scrollTo(0,0);

    const submitHandler=(e)=>{
        e.preventDefault();
    };

    return(
        <>
        <Header/>
        <div>
            <form onSubmit={submitHandler}>
                <h6>Seleccionar forma de pago</h6>
                <div>
                    <div>
                        <input type="radio" value="Paypal"/>
                        <label>Paypal o Tarjeta de credito</label>
                    </div>
                </div>
                <button>
                    <Link to="/placeholder">
                     Continuar
                    </Link>
                </button>
            </form>
        </div>
        </>
    )
};

export default PaymentScreen;