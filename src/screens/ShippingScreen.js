import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Redux/Actions/CartAction";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import TextField from '@mui/material/TextField';


const ShippingScreen = () => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  console.log(shippingAddress, "shippingAddress");
  let history = useNavigate();

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history("/payment");
  };

  return (
    <>
      <Header />
      <Container fixed>
        <Box sx={{ bgcolor: "#b3c5cd", height: "100vh" }}>
          <div>
            <form
              onSubmit={submitHandler}
              className="flex flex-col justify-center items-center mt-6"
            >
                <h6 className="font-bold text-xl leading-none text-primary mb-4">Direccion de envio</h6>
                <div  className="pb-4">
              <FormControl>
                <InputLabel htmlFor="outlined-adornment-password">Domicilio</InputLabel>
                <Input
                  type="text"
                  placeholder="Ingresar direccion"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
                </div>
                <div className="pb-4">
              <FormControl>
              <InputLabel htmlFor="outlined-adornment-password">Localidad</InputLabel>
                <Input
                  type="text"
                  placeholder="Ingrese localidad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormControl>
                </div>
                <div className="pb-4">
              <FormControl>
              <InputLabel htmlFor="outlined-adornment-password">Correo postal</InputLabel>
                <Input
                  type="text"
                  placeholder="Ingrese correo postal"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </FormControl>
                </div>
                <div className="pb-4">
              <FormControl>
              <InputLabel htmlFor="outlined-adornment-password">Pais</InputLabel>
                <Input
                  type="text"
                  placeholder="Ingrese pais"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </FormControl>
                </div>
                <div className="pb-4">
              <Button type="submit" variant="outlined">
                Continuar
              </Button>
                </div>
            </form>
          </div>
        </Box>
      </Container>
    </>
  );
};
export default ShippingScreen;
