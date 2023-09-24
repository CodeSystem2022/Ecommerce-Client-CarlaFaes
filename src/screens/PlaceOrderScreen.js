import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const placeOrderScreen = () => {
  window.scrollTo(0, 0);

  const placeOrderHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div>
        <div>
          <div>
            <i></i>
          </div>
          <div>
            <h5>
              <strong>Comprador</strong>
            </h5>
            <p>Admin</p>
            <p>amin@example</p>
          </div>
          <div>
            <h5>
              <strong>Informacion de pedido</strong>
            </h5>
            <p>envio: a domicilio</p>
            <p>metodo de pago:Paypal</p>
          </div>
        </div>
        <div>
          <div>
            <h5>
              <strong>Enviar a:</strong>
            </h5>
            <p>Direccion:calle falsa 1223</p>
          </div>
        </div>
        <div>
          <div>
            <img src="" alt="product" />
          </div>
          <div>
            <Link to={"/"}>
              <h5>Mobiliario hogar</h5>
            </Link>
          </div>
          <div>
            <h5>cantidad</h5>
          </div>
          <div>
            <h5>subtotal</h5>
          </div>
        </div>
        <button type="submit" onClick={placeOrderHandler}>
          <Link to="/order">Orden</Link>
        </button>
      </div>
    </>
  );
};
 export default placeOrderScreen; 