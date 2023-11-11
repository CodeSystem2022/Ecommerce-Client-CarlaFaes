import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/Actions/UserAction";
import { useNavigate } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";

const Header = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [keyword, setKeyword] = useState("");
  let history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    console.log("salio de la sesion");
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Tipo de keyword antes de toString:", typeof keyword);
    const keywordString = keyword ? keyword.toString().trim() : "";
    console.log("Tipo de keyword después de toString:", typeof keywordString);
    const url = `/search/${encodeURIComponent(keywordString)}`;
    console.log("URL de búsqueda:", url);
    if (keywordString) {
      // history(`/search/${encodeURIComponent(keywordString)}`)
      history(url);
    } else {
      history("/");
    }
  };
  console.log("keyword", keyword);
  return (
    <>
      <div className=" shadow bg-primary text-secondary p-5 md:flex md:items-center md:justify-between sm:flex sm:items-center sm:justify-between w-full left-0 ">
        <div>
          <p className="text-2xl font-[Poppins] cursor-pointer">
            Muebles Express
          </p>
          <p className="h-10 inline">Icono de home</p>
        </div>
        <div className="flex flex-row justify-around container max-w-full">
          {userInfo ? (
            <div className="flex">
              <ul className="md:flex md:items-center z-[-1] md:z-auto sm:z-auto md:static sm:static sm:flex sm:items-center sm:w-auto md:w-auto md:py-0 sm:py-0 md:pl-0 sm:pl-0 pl-7 py-4 absolute">
                <li className="mx-4 my-6 md:my-0">
                  <p className="text-xl hover:text-gray-800 duration-500">
                    Hola, {userInfo.name}
                  </p>
                </li>
                <li className=" my-6 md:my-0 mx-4 flex flex-row-reverse bg-green-200">
                  <form
                    onSubmit={submitHandler}
                    className="text-xl hover:text-gray-800 duration-500 "
                  >
                    <button className="bg-[#bf9e83] text-secondary hover:text-slate-300 font-[Poppins] duration-500 px-6 py-2 active:bg-violet-700 focus:outline-none rounded-full"  type="submit">Buscar</button>
                    <input
                      type="search"
                      placeholder="Buscar"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </form>
                </li>
                <li className="mx-4  my-6 md:my-0">
                  <Link
                    className="text-xl hover:text-gray-800 duration-500"
                    to="/profile"
                  >
                    Perfil
                  </Link>
                </li>
                <li className="mx-4  my-6 md:my-0">
                  <Link
                    className="text-xl hover:text-gray-800 duration-500"
                    to="#"
                    onClick={logoutHandler}
                  >
                    Cerrar sesion
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <ul className="md:flex md:items-center z-[-1] md:z-auto sm:z-auto">
                <li className="mx-4  my-6 md:my-0">
                  <Link
                    className="text-xl hover:text-gray-800 duration-500"
                    to="/login"
                  >
                    Iniciar sesion
                  </Link>
                </li>
                <li className="mx-4  my-6 md:my-0">
                  <Link
                    className="text-xl hover:text-gray-800 duration-500"
                    to="/register"
                  >
                    Registrarse
                  </Link>
                </li>
              </ul>
            </>
          )}
          <ul className="md:flex md:items-center z-[-1] md:z-auto sm:z-auto">
            <li className="mx-4  my-6 md:my-0">
              <Link to="/cart">
                <BsCartFill />
                <span className="text-xl hover:text-gray-800 duration-500">
                  {cartItems.length}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
