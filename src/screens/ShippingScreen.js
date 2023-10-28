import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const ShippingScreen = () => {
  window.scrollTo(0, 0);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div>
        <form onSubmit={submitHandler}>
          <h6>direccion de envio</h6>
          <input
            type="text"
            placeholder="Ingresar direccion"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ingrese ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ingrese correo postal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ingrese pais"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">
            <Link to="/payment">Continuar</Link>
          </button>
        </form>
      </div>
    </>
  );
};
export default ShippingScreen;
