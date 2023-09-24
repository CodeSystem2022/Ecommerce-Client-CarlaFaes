import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Register=()=>{
    window.scrollTo(0,0);

    return(
        <>
        <Header />
        <div>
            <form>
                <input type="text" placeholder="username"/>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="contraseña"/>

                <button type="submit">Registrarse</button>
                <p>
                    <Link to={"/login"}>
                    Ya tienes una cuenta? <strong>Inicia sesion</strong></Link>
                </p>
            </form>
        </div>
        </>
    )
}

export default Register;