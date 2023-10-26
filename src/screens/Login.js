import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Message from "../components/LoadingError/Error.js"
import Loading from "../components/LoadingError/Loading.js"
import { login } from "../Redux/Actions/UserAction";

const Login = () => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useNavigate();
  const location = useLocation();
  const dispatch=useDispatch();
  const redirect = location.search ? location.search.split("/")[1] : "/";

  const userLogin= useSelector((state)=> state.userLogin);
  const { error, loading, userInfo}= userLogin

  useEffect(()=>{
    if(userInfo){
        //history.push(redirect)
        history(redirect);
    }
  },[userInfo,history,redirect])

  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(login(email,password))
  }
  return (
    <div>
      <Header />
      <div>
        {error && <Message>{error}</Message>}
        {loading && <Loading/>}
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar sesion</button>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              {" "}
              Crear cuenta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
