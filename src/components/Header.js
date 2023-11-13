import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/Actions/UserAction";
import { useNavigate } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import { FcSearch } from "react-icons/fc";
import logo_icono from "../utils/logo.png"

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
      <div className="flex justify-between items-center p-2 sticky top-0 bg-[#2f4556]  z-10">
        <div>
          <Link to="/">
         <img src={logo_icono} alt="icono" className="w-28 h-24 rounded-lg"/>
          </Link>
        </div>
        <div className="flex flex-row justify-start items-center container max-w-full">
          {userInfo ? (
            <div className="flex">
              <ul className="md:flex md:items-center z-[-1] md:z-auto sm:z-auto md:static sm:static sm:flex sm:items-center sm:w-auto md:w-auto md:py-0 sm:py-0 md:pl-0 sm:pl-0 pl-7 py-4 absolute">
                <li className="mx-4 my-6 md:my-0">
                  <p className="text-xl text-secondary">
                    Hola, {userInfo.name}
                  </p>
                </li>

                <li className="mx-6  my-6 md:my-0">
                  <Link className="text-xl text-secondary" to="/profile">
                    Perfil
                  </Link>
                </li>
                <li className="mx-4  my-6 md:my-0">
                  <Link
                    className="text-xl text-secondary"
                    to="#"
                    onClick={logoutHandler}
                  >
                    Cerrar sesion
                  </Link>
                </li>
                <li className=" my-6 md:my-0 mx-4 flex flex-row-reverse">
                  <form
                    onSubmit={submitHandler}
                    className="text-xl hover:text-gray-800 flex flex-row-reverse"
                  >
                    <button
                      className=" hover:border-secondary hover:bg-slate-300  font-semibold rounded-full   text-secondary p-3"
                      type="submit"
                    >
                      <FcSearch className="top-0 right-0 text-2xl" />
                    </button>
                    <input
                      type="search"
                      placeholder="Busca un producto..."
                      onChange={(e) => setKeyword(e.target.value)}
                      className="focus:ring-2 focus:ring-secondary focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 px-2 ring-1 ring-slate-200 shadow-sm"
                    />
                  </form>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <ul className="md:flex md:items-center z-[-1] md:z-auto sm:z-auto">
                <li className="mx-4  my-6 md:my-0">
                  <Link
                    className="text-xl text-secondary"
                    to="/login"
                  >
                    Iniciar sesion
                  </Link>
                </li>
                <li className="mx-4  my-6 md:my-0">
                  <Link
                    className="text-xl text-secondary"
                    to="/register"
                  >
                    Registrarse
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
        <div  className="p-4 mr-3">
        <Link to="/cart" className="flex flex-col items-center w-10  gap-4">
          <span className="absolute pl-5 pt-1 text-lg font-bold text-red-400 border-slate-300 hover:text-gray-200 duration-500">
            {cartItems.length}
          </span>
          <BsCartFill className="text-2xl text-secondary" />
        </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
