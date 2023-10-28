import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Redux/Actions/CartAction";

const ShippingScreen = () => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  console.log(shippingAddress, "shippingAddress");
  let history = useNavigate();

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history("/payment");
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
          <button type="submit">Continuar</button>
        </form>
      </div>
    </>
  );
};
export default ShippingScreen;
