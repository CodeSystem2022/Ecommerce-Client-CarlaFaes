import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return(
    <>
    <div>
      Header
      <Link to="/cart">
        <i>icono de carrito</i>
        <span>{cartItems.length}</span>
      </Link>
    </div>
    </>
  );
};

export default Header;
