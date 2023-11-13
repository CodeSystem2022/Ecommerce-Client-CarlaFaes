import React, { useEffect } from "react";
import moment from "moment";
import Header from "../components/Header";
import { listMyOrders } from "../Redux/Actions/OrderAction.js";
import ProfileTabs from "../components/profileComponents/ProfileTabs.js";
import Orders from "../components/profileComponents/Orders";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../Redux/Actions/UserAction";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

const ProfileScreen = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo, "userInfo");
  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading, error, orders } = orderMyList;
  console.log(orderMyList, "orderMyList");

  useEffect(() => {
    dispatch(listMyOrders());
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container fixed>
        <Box sx={{ bgcolor: "#b3c5cd", height: "100vh" }}>
          <ProfileTabs />
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-evenly">
              <h5  className="w-full mb-3 font-normal font-[Poppins] text-lg leading-none text-primary">
                <strong>{userInfo.name}</strong>
              </h5>
              <span>
                <>Se unió en {moment(userInfo.createdAt).format("LL")}</>
              </span>
            </div>   
            <div className="flex flex-row justify-center items-center">
                <p className="w-full mb-3 font-normal font-[Poppins] text-lg leading-none text-primary">Lista de pedidos</p>
                <span className="flex flex-row font-bold text-red-500 items-center justify-center w-14 bg-slate-400 rounded-full">
                  {orders ? orders.length : 0}
                </span>
              </div>   
          <div>
            <Orders orders={orders} loading={loading} error={error} />
          </div>
          </div>
        </Box>
      </Container>
    </>
  );
};
export default ProfileScreen;
