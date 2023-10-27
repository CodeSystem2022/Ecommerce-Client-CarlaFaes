import React, { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/Actions/UserAction";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

const Register=()=>{
    window.scrollTo(0,0);
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const dispatch=useDispatch();
    const location = useLocation();
    const redirect=location.search?location.searchsplit("=")[1]:"/"

    const userRegister=useSelector((state)=> state.userRegister);
    const {error, loading, userInfo}=userRegister;
    let history = useNavigate();

    useEffect(()=>{
        if(userInfo){
            history(redirect);
        }
      },[userInfo,history,redirect])
    
      const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(register(name,email,password))
      }
    return(
        <>
        <Header />
        <div>
        {error && <Message>{error}</Message>}
        {loading && <Loading/>}
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="username" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="contraseña" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <button type="submit">Registrarse</button>
                <p>
                    <Link  to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                    Ya tienes una cuenta? <strong>Inicia sesion</strong></Link>
                </p>
            </form>
        </div>
        </>
    )
}

export default Register;