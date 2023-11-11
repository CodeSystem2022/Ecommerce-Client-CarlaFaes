import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/Actions/UserAction";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch= useDispatch()
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [keyword, setKeyword]=useState("")
  let history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const keywordString = keyword.toString().trim();

  const logoutHandler= ()=>{
    console.log("salio de la sesion")
    dispatch(logout())
  }

  const submitHandler = (e)=>{
    e.preventDefault()
    console.log("Tipo de keyword antes de toString:", typeof keyword);
    const keywordString = keyword ? keyword.toString().trim() : "";
    console.log("Tipo de keyword después de toString:", typeof keywordString);
    const url = `/search/${encodeURIComponent(keywordString)}`;
    console.log("URL de búsqueda:", url);
    if(keywordString){
     // history(`/search/${encodeURIComponent(keywordString)}`)
     history(url);
    }
    else{
      history("/")
    }
  }
console.log("keyword", keyword);
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
      <div>
        <form onSubmit={submitHandler}>
            <input type="search" placeholder="Buscar" onChange={(e)=>setKeyword(e.target.value)} />
            <button type="submit">Buscar</button>
        </form>
      </div>
    </>
  );
};

export default Header;
