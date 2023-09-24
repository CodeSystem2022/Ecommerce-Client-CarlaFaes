import React from "react";
import Header from "../components/Header";

const OrderScreen=()=>{
    window.scrollTo(0,0);

    return(
        <>
        <Header/>
        <div>
            <div>
                <i>icono</i>
            </div>
            <div>
                <h5>
                    <strong>Comprador</strong>
                </h5>
                <p>AdminEjemplo</p>
                <p>
                    <a href={`mailto:correo@ejemplo.com`} >admin@ejemplo.com</a>
                </p>
            </div>
        </div>
        </>
    )
}

export default OrderScreen;