import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/Actions/UserAction";

const Header = () => {
  const dispatch= useDispatch()
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler= ()=>{
    console.log("salio de la sesion")
    dispatch(logout())
  }

  return (
    <>
      <div>
        Header
        <div>
          {userInfo ? (
            <>
            <p>Hola, {userInfo.name}</p>
            <div>
                <Link to="/profile">Perfil</Link>
              </div>
              <div>
                <Link to="#" onClick={logoutHandler}>Cerrar sesion</Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to="/login">Iniciar sesion</Link>
              </div>
              <div>
                <Link to="/register">Registrarse</Link>
              </div>
            </>
          )}
        </div>
        <Link to="/cart">
          <i>icono de carrito</i>
          <span>{cartItems.length}</span>
        </Link>
      </div>
    </>
  );
};

export default Header;
