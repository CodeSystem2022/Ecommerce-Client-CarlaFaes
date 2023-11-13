import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";

const NotFound=()=>{
return(
    <>
    <Header/>
    <Container fixed>
    <Box sx={{ bgcolor: "#b3c5cd", height: "100vh" }}>
    <div className="flex flex-col justify-center items-center">
        Pagina no encontrada
        <div>
            <Button variant="outlined">
                <Link to="/">
                Inicio
                </Link>
            </Button>
        </div>
    </div>
    </Box>
    </Container>
    </>
)
}

export default NotFound;