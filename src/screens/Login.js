import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Message from "../components/LoadingError/Error.js";
import Loading from "../components/LoadingError/Loading.js";
import { login } from "../Redux/Actions/UserAction";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

const Login = () => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("/")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      //history.push(redirect)
      history(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div>
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
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <div className="m-4">
              <Button type="submit" variant="outlined">
                Iniciar sesion
              </Button>
              </div>
              <p className="font-semibold font-[Poppins] text-lg leading-none text-primary">
                Aun no tenes una cuenta?
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="font-mono italic"
                >
                  {" "}
                  Crear cuenta
                </Link>
              </p>
            </form>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
