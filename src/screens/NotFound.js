import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const NotFound=()=>{
return(
    <>
    <Header/>
    <div>
        Page Not Found
        <div>
            <button>
                <Link to="/">
                Inicio
                </Link>
            </button>
        </div>
    </div>
    </>
)
}

export default NotFound;