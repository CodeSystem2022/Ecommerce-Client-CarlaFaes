import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/UserAction.js";
import Loading from "../LoadingError/Loading.js";
import Message from "../LoadingError/Error.js";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";


const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  // console.log(userDetails, "user details");

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;
  //console.log(loading, "userUpdate linea 23");
  console.log(updateLoading, "updateLoading ");

  const toastId = React.useRef(null);

  const toastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    //comparacion de contraseñas
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Las contraseñas no coinciden",
          toastObjects
        );
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      //console.log(userUpdateProfile, "updateUserProfile profile");
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Se guardo exitosamente", toastObjects);
      }
    }
  };

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <div>
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-center items-center mt-6"
        >
          <FormControl>
              <div className="m-3">
                <Input
                placeholder="Nombre de usuario"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
          </FormControl>
          <FormControl>
            <div>
              <div className="m-3">
                <Input
                placeholder="Correo electronico"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </FormControl>
          <FormControl>
              <div className="m-3">
                <Input
                placeholder="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
          </FormControl>
          <FormControl>
            <div>
              <div className="m-3">
                <Input
                placeholder="Confirmar contraseña"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </FormControl>
          <div className="m-3">
          <Button variant="outlined" type="submit">
            Actualizar perfil
          </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileTabs;
