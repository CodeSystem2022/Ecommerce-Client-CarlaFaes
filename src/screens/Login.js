import React from 'react'
import { Link } from "react-router-dom"
import Header from '../components/Header'

const Login = () => {
    window.scrollTo(0, 0);
  return (
    <div>
        <Header/>
        <div>
            <form>
                <input type='email' placeholder='Email'/>
                <input type='password' placeholder='Password'/>
                <button>Iniciar sesion</button>
                <p>
                    <Link to={"/register"}> Crear cuenta</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Login