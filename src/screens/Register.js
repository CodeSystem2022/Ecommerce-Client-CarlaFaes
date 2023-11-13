import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/Actions/UserAction";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

const Register = () => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  let history = useNavigate();

  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <>
      <Header />
      <Container fixed>
        <Box sx={{ bgcolor: "#b3c5cd", height: "100vh" }}>
          <div>
            {error && <Message>{error}</Message>}
            {loading && <Loading />}
            <form
              onSubmit={submitHandler}
              className="flex flex-col justify-center items-center mt-6"
            >
              <FormControl>
                <Input
                  type="text"
                  placeholder="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="password"
                  placeholder="contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <div className="m-4">
              <Button type="submit" variant="outlined">
                Registrarse
              </Button>
              </div>
              <p className="font-semibold font-[Poppins] text-lg leading-none text-primary">
                Ya tienes una cuenta?
                <Link
                  className="font-mono italic"
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                >
                  <strong>Inicia sesion</strong>
                </Link>
              </p>
            </form>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default Register;
