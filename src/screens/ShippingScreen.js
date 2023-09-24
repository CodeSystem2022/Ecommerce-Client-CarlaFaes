import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const ShippingScreen=()=>{
    window.scrollTo(0,0);

    const submitHandler=(e)=>{
        e.preventDefault();
    }

    return(
        <>
        <Header/>
        <div>
            <form onSubmit={submitHandler}>
                <h6>direccion de envio</h6>
                <input type="text" placeholder="Ingresar direccion"/>
                <input type="text" placeholder="Ingrese ciudad"/>
                <input type="text" placeholder="Ingrese correo postal"/>
                <input type="text" placeholder="Ingrese pais"/>
                <button type="submit">
                    <Link to="/payment">Continuar</Link>
                </button>
            </form>
        </div>
        </>
    )
}
export default ShippingScreen;