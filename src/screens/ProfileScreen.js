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
          <div>
            <div>
              <img src="" alt="userprofileimage" />
            </div>
            <div>
              <h5>
                <strong>{userInfo.name}</strong>
              </h5>
              <span>
                <>Se unió en {moment(userInfo.createdAt).format("LL")}</>
              </span>
            </div>
            <div></div>
            <div id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button
                id="v-pills-home-tab"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                Config perfil
              </button>
              <button
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="true"
              >
                Lista de pedidos{" "}
                <span style={{ color: "red" }}>
                  {orders ? orders.length : 0}
                </span>
              </button>
            </div>
          </div>
          <div>
            <Orders orders={orders} loading={loading} error={error} />
          </div>
        </Box>
      </Container>
    </>
  );
};
export default ProfileScreen;
