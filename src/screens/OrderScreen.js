import React, { useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOrderDetails } from "../Redux/Actions/OrderAction";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";

const OrderScreen = () => {
  window.scrollTo(0, 0);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  const { order, loading, error } = orderDetails;
  console.log(id,'id')
  //const orderId = _id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);
  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div>
            <div>
              <i>icono</i>
            </div>
            <div>
              <h5>
                <strong>{order.user.name}</strong>
              </h5>
              <p>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderScreen;
